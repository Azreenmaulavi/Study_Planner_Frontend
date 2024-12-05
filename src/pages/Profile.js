import { useState, useEffect } from "react";
import { Row, Col, Card, Button, Avatar, Form, Input, Upload, message } from "antd";
import { EditOutlined, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import api from "../services/Api.js"; // Assuming this is where your API methods are defined

import BgProfile from "../assets/images/bg-profile.jpg";

function Profile() {
  const [imageURL, setImageURL] = useState(null);
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false); // Manage edit state
  const [form] = Form.useForm(); // For handling form data

  // Get userId from local storage
  const userId = localStorage.getItem("userId");

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ensure userId is available
        if (!userId) {
          message.error("User not found!");
          return;
        }

        const response = await api.get(`/auth/user/getUserProfile/${userId}`); // Fetch user profile using userId
        setUserData(response.data.data); // Set the user data from the API
        setImageURL(response.data.data.profilePicture); // Set the profile picture URL
        form.setFieldsValue(response.data); // Set the form fields
      } catch (error) {
        message.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [userId, form]);

  // Convert image to Base64 for preview
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // Validate file before upload
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  // Handle the profile picture change
  const handleProfilePictureChange = (info) => {
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageURL(imageUrl); // Update the profile image URL
      });
    }
  };

  // Save changes to the profile
  const handleSave = async (values) => {
    try {
      // Create FormData to send the image and other fields
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("profilePicture", values.profilePicture[0]?.originFileObj);

      // Send the data to the backend to update the profile
      await api.post(`/auth/user/updateProfile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Specify the content type for file upload
        },
      });

      message.success("Profile updated successfully");
      setEditing(false); // Turn off edit mode
    } catch (error) {
      message.error("Failed to update profile");
    }
  };

  // Enable edit mode
  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    form.setFieldsValue(userData); // Reset the form values
    setImageURL(userData.profilePicture); // Reset the profile picture
    setEditing(false); // Exit edit mode
  };

  return (
    <div>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      ></div>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar
                size={74}
                shape="square"
                src={imageURL}
                style={{ marginBottom: "16px" }}
              />
              <div className="avatar-info">
                <h4 className="font-semibold m-0">{userData?.name || "Loading..."}</h4>
                <p>{userData?.email || "Loading..."}</p>
              </div>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                icon={<EditOutlined />}
                type="primary"
                onClick={handleEdit}
                disabled={editing}
              >
                Edit
              </Button>
            </Col>
          </Row>
        }
      ></Card>

      {editing && (
        <Card title="Edit Profile">
          <Form
            form={form}
            onFinish={handleSave}
            initialValues={userData}
            encType="multipart/form-data"
          >
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item
              name="profilePicture"
              label="Profile Picture"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList || []} // Fix here
              beforeUpload={beforeUpload}
              onChange={handleProfilePictureChange}
            >
              <Upload
                name="profilePicture"
                listType="picture-card"
                maxCount={1}
                showUploadList={false}
              >
                {imageURL ? (
                  <img src={imageURL} alt="Profile" style={{ width: "100%" }} />
                ) : (
                  <div>Upload</div>
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Row justify="space-between">
                <Col>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    htmlType="submit"
                  >
                    Save Changes
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
}

export default Profile;
