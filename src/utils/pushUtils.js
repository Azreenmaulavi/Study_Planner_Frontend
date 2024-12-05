// // Purpose: Utilities for handling subscription.
// // src/utils/pushUtils.js

// // // Converts ArrayBuffer to Base64 encoding
// // function arrayBufferToBase64(buffer) {
// //     const uint8Array = new Uint8Array(buffer);
// //     return btoa(String.fromCharCode.apply(null, uint8Array));
// //   }
  
// //   // Retrieves and returns the P-256 ECDSA keys (p256dh, auth) for Web Push
// //   async function getPushKeys() {
// //     try {
// //       // Generate an ECDSA key pair with the P-256 curve
// //       const keyPair = await crypto.subtle.generateKey(
// //         {
// //           name: 'ECDSA',
// //           namedCurve: 'P-256', // Use the P-256 curve for Web Push keys
// //         },
// //         true,
// //         ['sign', 'verify'] // Only sign for private key (auth) and verify for public key (p256dh)
// //       );
  
// //       // Log the generated key pair to ensure they are correct
// //       console.log("Generated Key Pair:", keyPair);
  
// //       // Export the keys as raw byte arrays
// //       const p256dh = await crypto.subtle.exportKey('raw', keyPair.publicKey);
// //       const auth = await crypto.subtle.exportKey('raw', keyPair.privateKey);
  
// //       // Log the exported raw keys
// //       console.log("Raw P256DH Key:", p256dh);
// //       console.log("Raw Auth Key:", auth);
  
// //       // Convert the byte arrays to Base64 strings and return them
// //       return {
// //         p256dh: arrayBufferToBase64(p256dh),
// //         auth: arrayBufferToBase64(auth),
// //       };
// //     } catch (error) {
// //       console.error('Error generating push keys:', error);
// //       throw new Error('Failed to generate push keys');
// //     }
// //   }
  
// //   // Converts a base64 URL-safe string to a Uint8Array
// //   function urlBase64ToUint8Array(base64String) {
// //     const padding = '='.repeat((4 - (base64String.length % 4)) % 4); // Add padding if necessary
// //     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/'); // URL-safe to standard base64
// //     const rawData = atob(base64); // Decode base64 to raw binary
// //     const outputArray = new Uint8Array(rawData.length);
  
// //     // Populate the Uint8Array with decoded values
// //     for (let i = 0; i < rawData.length; ++i) {
// //       outputArray[i] = rawData.charCodeAt(i);
// //     }
  
// //     return outputArray;
// //   }
  
// //   // Export the utility functions
// //   export { getPushKeys, urlBase64ToUint8Array };
// // Converts ArrayBuffer to Base64 encoding
// function arrayBufferToBase64(buffer) {
//   const uint8Array = new Uint8Array(buffer);
//   return btoa(String.fromCharCode(...uint8Array));
// }

// // Retrieves and returns the P-256 ECDH keys (p256dh, auth) for Web Push
// async function getPushKeys() {
//   try {
//     // Generate an ECDH key pair with the P-256 curve
//     const keyPair = await crypto.subtle.generateKey(
//       {
//         name: 'ECDH', // Use ECDH (for key agreement)
//         namedCurve: 'P-256', // Required curve for Web Push
//       },
//       true, // Keys must be extractable
//       ['deriveKey'] // Key usages for Web Push
//     );

//     // Export the keys as raw byte arrays
//     const p256dh = await crypto.subtle.exportKey('raw', keyPair.publicKey);
//     const auth = crypto.getRandomValues(new Uint8Array(16)); // Generate random auth secret

//     // Convert the byte arrays to Base64 strings and return them
//     return {
//       p256dh: arrayBufferToBase64(p256dh),
//       auth: arrayBufferToBase64(auth),
//     };
//   } catch (error) {
//     console.error('Error generating push keys:', error);
//     throw new Error('Failed to generate push keys');
//   }
// }

// // Converts a base64 URL-safe string to a Uint8Array
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//   const rawData = atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }

//   return outputArray;
// }

// // Export the utility functions
// export { getPushKeys, urlBase64ToUint8Array };









  // Purpose: Utilities for handling subscription.
// src/utils/pushUtils.js

// Converts ArrayBuffer to Base64 encoding
function arrayBufferToBase64(buffer) {
  const uint8Array = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...uint8Array));  // Convert each byte to a char
}

// Converts a Base64 string (URL-safe) to a Uint8Array
function base64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64); // Decode from Base64
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i); // Convert each char to byte
  }

  return outputArray;
}

// Retrieves and returns the P-256 ECDH keys (p256dh, auth) for Web Push
async function getPushKeys() {
  try {
    // Generate an ECDH key pair with the P-256 curve
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'ECDH', // Use ECDH (for key agreement)
        namedCurve: 'P-256', // Required curve for Web Push
      },
      true, // Keys must be extractable
      ['deriveKey'] // Key usages for Web Push
    );

    // Export the keys as raw byte arrays
    const p256dh = await crypto.subtle.exportKey('raw', keyPair.publicKey);
    const auth = crypto.getRandomValues(new Uint8Array(16)); // Generate random auth secret

    // Convert the byte arrays to Base64 strings and return them
    return {
      p256dh: arrayBufferToBase64(p256dh),
      auth: arrayBufferToBase64(auth),
    };
  } catch (error) {
    console.error('Error generating push keys:', error);
    throw new Error('Failed to generate push keys');
  }
}

// Converts a base64 URL-safe string to a Uint8Array (Base64 decoding)
function urlBase64ToUint8Array(base64String) {
  return base64ToUint8Array(base64String);
}

// Export the utility functions
export { getPushKeys, urlBase64ToUint8Array };
