CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id UUID NOT NULL,
  parent_id UUID,
  name VARCHAR(255) NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_folders_user_id  -- for the sake of foreign key ref
    UNIQUE (user_id, id),

  CONSTRAINT fk_folders_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,
  
  CONSTRAINT fk_folders_parent
    FOREIGN KEY (user_id, parent_id)
    REFERENCES folders(user_id, id)
    ON DELETE CASCADE
);
