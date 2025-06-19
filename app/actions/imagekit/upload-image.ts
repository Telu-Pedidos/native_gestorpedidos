// import ImageKit from "imagekit";
// import * as FileSystem from "expo-file-system";
// import {
//   IMAGEKIT_PRIVATE_KEY,
//   IMAGEKIT_PUBLIC_KEY,
//   IMAGEKIT_URL_ENDPOINT,
// } from "@env";

// const imagekit = new ImageKit({
//   publicKey: IMAGEKIT_PUBLIC_KEY!,
//   privateKey: IMAGEKIT_PRIVATE_KEY!,
//   urlEndpoint: IMAGEKIT_URL_ENDPOINT!,
// });

// export const uploadImage = async (uri: string) => {
//   if (!uri) {
//     throw new Error("URI da imagem é obrigatória.");
//   }

//   try {
//     // Lê a imagem como base64
//     const base64 = await FileSystem.readAsStringAsync(uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const fileName = uri.split("/").pop() || "upload.jpg";

//     const response = await imagekit.upload({
//       file: `data:image/jpeg;base64,${base64}`, // você pode ajustar o mime type se precisar
//       fileName,
//     });

//     return response;
//   } catch (error) {
//     console.error("Erro ao fazer upload da imagem:", error);
//     throw new Error("Falha ao fazer upload da imagem.");
//   }
// };
