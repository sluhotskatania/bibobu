import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { logout, updateProfile } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import css from "./ProfileInfo.module.css";
import { apiDomain } from "../../constants";

type Props = {
  user: {
    name: string;
    bio: string;
    photo: string;
  };
  formData: { name: string; bio: string };
};

export default function ProfileInfo({ user, formData }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const photoFormData = new FormData();
      photoFormData.append("photo", file);
      photoFormData.append("name", formData.name);
      photoFormData.append("bio", formData.bio);

      dispatch(updateProfile(photoFormData))
        .unwrap()
        .then(() => toast.success("Фото профілю оновлено успішно"))
        .catch(() => toast.error("Помилка оновлення фото профілю"));
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Ви успішно вийшли з акаунту");
    } catch {
      toast.error("Помилка виходу з акаунту");
    }
  };

  return (
    <div className="col-md-4 text-center position-relative">
      <div className={`position-relative mb-3 ${css.profileImageWrapper}`}>
        <img
          src={
            user?.photo || `${apiDomain}uploads/profiles/default-profile.png`
          }
          alt="Фото профілю"
          className={`img-fluid rounded-circle mb-3 ${css.profileImage}`}
        />
        <label
          htmlFor="photoInput"
          className={`btn btn-dark ${css.changePhotoButton}`}
        >
          Змінити фото
        </label>
        <input
          type="file"
          id="photoInput"
          accept="image/*"
          className="d-none"
          onChange={handlePhotoChange}
        />
      </div>
      <h3>{user?.name}</h3>
      <p className="text-muted">{user?.bio || "Біографія не вказана"}</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Вийти з акаунту
      </button>
    </div>
  );
}
