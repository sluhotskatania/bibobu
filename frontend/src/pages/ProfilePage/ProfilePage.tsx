import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchProfile, updateProfile } from "../../redux/auth/operations";
import { fetchTours } from "../../redux/tours/operations";
import {
  selectUser,
  selectIsLoading,
  selectAuthError,
} from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import css from "./ProfilePage.module.css";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import LikedToursList from "../../components/LikedToursList/LikedToursList";
import UserFeedbacksList from "../../components/UserFeedbacksList/UserFeedbacksList";

export default function ProfilePage() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchTours());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const profileFormData = new FormData();
      profileFormData.append("name", formData.name);
      profileFormData.append("bio", formData.bio);
      await dispatch(updateProfile(profileFormData)).unwrap();
      setEditMode(false);
      toast.success("Профіль оновлено успішно");
    } catch {
      toast.error("Помилка оновлення профілю");
    }
  };

  if (isLoading) return <p>Завантаження...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className={`container py-5 ${css.profilePage}`}>
      <div className="row">
        {user && (
          <ProfileInfo
            user={{
              name: user?.name || "",
              bio: user?.bio || "",
              photo: user?.photo || "",
            }}
            formData={formData}
          />
        )}
        <div className="col-md-8">
          <ProfileDetails
            user={{
              name: user?.name || "",
              bio: user?.bio || "",
              likedTours: user?.likedTours || [],
              boughtTours: user?.boughtTours || [],
            }}
            editMode={editMode}
            setEditMode={setEditMode}
            formData={formData}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
          />
          <hr className="my-4" />
          <h2 className="mb-3">Вподобані тури</h2>
          <LikedToursList />
          <hr className="my-4" />
          <UserFeedbacksList userId={user?._id || ""} />
        </div>
      </div>
    </div>
  );
}
