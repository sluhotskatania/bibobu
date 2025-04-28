type Props = {
  user: {
    name: string;
    bio: string;
    likedTours: string[];
    boughtTours: string[];
  };
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  formData: { name: string; bio: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
};

export default function ProfileDetails({
  user,
  editMode,
  setEditMode,
  formData,
  handleInputChange,
  handleSave,
}: Props) {
  return (
    <div>
      <h1 className="mb-4">Профіль</h1>
      {editMode ? (
        <div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Ім'я
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bio" className="form-label">
              Біографія
            </label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSave}>
            Зберегти
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Ім'я:</strong> {user?.name}
          </p>
          <p>
            <strong>Біографія:</strong> {user?.bio || "Не вказано"}
          </p>
          <p>
            <strong>Кількість вподобаних турів:</strong>{" "}
            {(user?.likedTours || []).length || 0}
          </p>
          <p>
            <strong>Кількість куплених турів:</strong>{" "}
            {(user?.boughtTours || []).length || 0}
          </p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setEditMode(true)}
          >
            Редагувати профіль
          </button>
        </div>
      )}
    </div>
  );
}
