const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL || "https://nyc.cloud.appwrite.io/v1"),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID || "688a683b001d40172265"),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUsersId: String(import.meta.env.VITE_APPWRITE_USERS_ID),
}


export default config
