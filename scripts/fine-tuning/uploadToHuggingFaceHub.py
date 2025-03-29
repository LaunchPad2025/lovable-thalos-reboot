from huggingface_hub import HfApi, HfFolder

# Define the file and repository details
file_path = "./media_violations_set.ndjson"
repo_id = "your-username/media-violations-dataset"  # Replace with your Hugging Face repo ID

# Authenticate with Hugging Face Hub
api = HfApi()
token = HfFolder.get_token()  # Ensure you have logged in using `huggingface-cli login`

# Upload the file to the repository
api.upload_file(
    path_or_fileobj=file_path,
    path_in_repo="media_violations_set.ndjson",
    repo_id=repo_id,
    repo_type="dataset",
)

print(f"File {file_path} uploaded to {repo_id} on Hugging Face Hub.")
