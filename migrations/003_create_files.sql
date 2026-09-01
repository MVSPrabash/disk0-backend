CREATE TABLE files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL,
  folder_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,

  mime_type VARCHAR(255) NOT NULL,
  size BIGINT NOT NULL CHECK (size >= 0),

  blob_hash BYTEA NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),


  CONSTRAINT fk_files_user
    FOREIGN KEY (user_id)
    REFERENCES users(id),
  
  CONSTRAINT fk_files_folder
    FOREIGN KEY (user_id, folder_id)
    REFERENCES folders(user_id, id)
    ON DELETE CASCADE
);