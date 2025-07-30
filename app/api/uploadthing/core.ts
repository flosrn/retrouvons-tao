import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTFiles } from "uploadthing/server";

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log("Upload error:", err.message);
    console.log("  - Above error caused by:", err.cause);
    console.log("  - Above error stack:", err.stack);
    return { message: err.message };
  },
});

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
    .middleware(async ({ files }) => {
      // This code runs on your server before upload
      // Check if UPLOADTHING_TOKEN is configured
      if (!process.env.UPLOADTHING_TOKEN) {
        console.error('UPLOADTHING_TOKEN not configured in environment variables');
        throw new UploadThingError('Server configuration error');
      }
      
      // Enhanced filename safety: ensure safe filenames for all files
      const processedFiles = files.map((file) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 8);
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const safeFileName = `tao-sighting-${timestamp}-${randomId}.${fileExtension}`;
        
        console.log(`Server-side renaming: "${file.name}" -> "${safeFileName}"`);
        
        return {
          ...file,
          name: safeFileName,
          customId: `tao-${timestamp}-${randomId}`
        };
      });
      
      // Store original filename in metadata and return processed files
      return { 
        uploadedAt: new Date().toISOString(),
        source: "tao-sighting-form",
        originalFileName: files[0]?.name || 'unknown',
        userId: "anonymous", // For future authentication
        [UTFiles]: processedFiles
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for Tao sighting");
      console.log("File key:", file.key);
      console.log("File name:", file.name);
      console.log("Original filename:", metadata.originalFileName);
      console.log("Custom ID:", file.customId);

      // Return data that will be sent to the client
      return { 
        key: file.key,
        name: file.name,
        originalName: metadata.originalFileName,
        size: file.size,
        uploadedAt: metadata.uploadedAt,
        customId: file.customId
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;