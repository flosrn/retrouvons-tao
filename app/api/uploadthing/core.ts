import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      // Check if UPLOADTHING_TOKEN is configured
      if (!process.env.UPLOADTHING_TOKEN) {
        console.error('UPLOADTHING_TOKEN not configured in environment variables');
        throw new UploadThingError('Server configuration error');
      }
      
      // For now, we'll allow all uploads (no authentication required)
      // You can add authentication logic here later if needed
      
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { 
        uploadedAt: new Date().toISOString(),
        source: "tao-sighting-form"
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for Tao sighting");
      console.log("File URL:", file.url);
      console.log("File metadata:", metadata);

      // Return data that will be sent to the client
      return { 
        url: file.url,
        name: file.name,
        size: file.size,
        uploadedAt: metadata.uploadedAt
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;