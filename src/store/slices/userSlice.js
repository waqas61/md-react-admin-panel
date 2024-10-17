import { createSlice } from "@reduxjs/toolkit";

const localuser = localStorage.getItem("user");
// const userObj = (localuser != "undefined" && localuser) ? JSON.parse(localuser) : null;
const userObj = (localuser != "undefined" && localuser) ? JSON.parse(localuser) : null;


export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: userObj ? userObj.id : null,
    authToken: userObj ? userObj.authToken : null,
    title: userObj ? userObj.title : "",
    first_name: userObj ? userObj.first_name : "",
    last_name: userObj ? userObj.last_name : "",
    gender: userObj ? userObj.gender : "",
    university_name: userObj ? userObj.university_name : "",
    degree_name: userObj ? userObj.degree_name : "",
    signup_id: userObj ? userObj.signup_id : null,
    email: userObj ? userObj.email : "",
    mobile: userObj ? userObj.mobile : null,
    other_state_available: userObj ? userObj.other_state_available : null,
    other_state_id: userObj ? userObj.other_state_id : [],
    willing_to_relocate: userObj ? userObj.willing_to_relocate : null,
    role_type: userObj ? userObj.role_type : "",
    profile_photo_path: userObj ? userObj.profile_photo_path : null,
    is_verified: userObj ? userObj.is_verified : false,
    is_active: userObj ? userObj.is_active : false,
    is_locked: userObj ? userObj.is_locked : false,
    zip: userObj ? userObj.zip : null,
    street: userObj ? userObj.street : null,
    city_id: userObj ? userObj.city_id : null,
    state_id: userObj ? userObj.state_id : null,
    country_id: userObj ? userObj.country_id : null,
    is_dental_experience: userObj ? userObj.is_dental_experience : false,
    is_certificate_required: userObj ? userObj.is_certificate_required : false,
    questionnaire_answers: userObj ? userObj.questionnaire_answers : null,
    category_id: userObj ? userObj.category_id : null,
    is_profile_completed: userObj ? userObj.is_profile_completed : false,
    is_contract_signed: userObj ? userObj.is_contract_signed : false,
    created_at: userObj ? userObj.created_at : null,
    updated_at: userObj ? userObj.updated_at : null,
    deleted_at: userObj ? userObj.deleted_at : null,
    steps_completed: userObj ? userObj.steps_completed : null,
    user_subscriptions: userObj ? userObj.user_subscriptions : [],
    user_sub_categories: userObj ? userObj.user_sub_categories : [],
    user_experiences: userObj ? userObj.user_experiences : [],
    user_licensed_states: userObj ? userObj.user_licensed_states : [],
    user_billing_addresses: userObj ? userObj.user_billing_addresses : [],
    companies: userObj ? userObj.companies : [],
    user_skills: userObj ? userObj.user_skills : [],
    user_languages: userObj ? userObj.user_languages : [],
    user_locations: userObj ? userObj.user_locations : [],
    avatar: userObj ? userObj.avatar : null,
    socket_channel: userObj ? userObj.socket_channel : null,
    website: userObj ? userObj.website : null,
    time_zone_id: userObj ? userObj.time_zone_id : null,
    user_time_zone: userObj ? userObj.user_time_zone : "",
    time_zone: userObj ? userObj.time_zone : null,
    is_loggedin: userObj ? userObj.is_loggedin : false,

  },
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;

      Object.keys(userData).forEach((key) => {
        if (state.hasOwnProperty(key)) {
          state[key] = userData[key];
        }
      });
    },
    setGender: (state, action) => {
      state.gender = action.payload
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload
    },

    setUniversityName: (state, action) => {
      state.university_name = action.payload
    },
    setUserLocations: (state, action) => {
      state.user_locations = action.payload
    },
    setUserLanguages: (state, action) => {
      state.user_languages = action.payload
    },
    setUserSkills: (state, action) => {
      state.user_skills = action.payload
    },
    setDegreeName: (state, action) => {
      state.degree_name = action.payload
    },
    setOtherStateAviable: (state, action) => {
      state.other_state_available = action.payload
    },
    setOtherStateId: (state, action) => {
      state.other_state_id = action.payload
    },
    setWillingToRelocate: (state, action) => {
      state.willing_to_relocate = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.first_name = action.payload;
    },
    setLastName: (state, action) => {
      state.last_name = action.payload;
    },
    setMobile: (state, action) => {
      state.mobile = action.payload;
    },
    setRoleType: (state, action) => {
      state.role_type = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSignupId: (state, action) => {
      state.signup_id = action.payload;
    },
    setProfilePhotoPath: (state, action) => {
      state.profile_photo_path = action.payload;
    },
    setIsVerified: (state, action) => {
      state.is_verified = action.payload;
    },
    setIsActive: (state, action) => {
      state.is_active = action.payload;
    },
    setIsLocked: (state, action) => {
      state.is_locked = action.payload;
    },
    setZip: (state, action) => {
      state.zip = action.payload;
    },
    setStreet: (state, action) => {
      state.street = action.payload;
    },
    setCityId: (state, action) => {
      state.city_id = action.payload;
    },
    setStateId: (state, action) => {
      state.state_id = action.payload;
    },
    setCountryId: (state, action) => {
      state.country_id = action.payload;
    },
    setIsDentalExperience: (state, action) => {
      state.is_dental_experience = action.payload;
    },
    setIsCertificateRequired: (state, action) => {
      state.is_certificate_required = action.payload;
    },
    setQuestionnaireAnswers: (state, action) => {
      state.questionnaire_answers = action.payload;
    },
    setCategoryId: (state, action) => {
      state.category_id = action.payload;
    },
    setIsProfileCompleted: (state, action) => {
      state.is_profile_completed = action.payload;
    },
    setIsContractSigned: (state, action) => {
      state.is_contract_signed = action.payload;
    },
    setCreatedAt: (state, action) => {
      state.created_at = action.payload;
    },
    setUpdatedAt: (state, action) => {
      state.updated_at = action.payload;
    },
    setDeletedAt: (state, action) => {
      state.deleted_at = action.payload;
    },
    setStepsCompleted: (state, action) => {
      state.deleted_at = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setUserExperiences: (state, action) => {
      state.user_experiences = action.payload;
    },
    setWebsite: (state, action) => {
      state.website = action.payload;
    },
    setTimeZoneId: (state, action) => {
      state.time_zone_id = action.payload;
    },
    setUserTimeZone: (state, action) => {
      state.user_time_zone = action.payload;
    },
    setTimeZone: (state, action) => {
      state.time_zone = action.payload;
    },
    setIsloggedin: (state, action) => {
      state.is_loggedin = action.payload;
    },
    // Add more reducers for other user data fields
  },
});

export const {
  setUser,
  setEmail,
  setFirstName,
  setLastName,
  setGender,
  setUniversityName,
  setUserLanguages,
  setUserLocations,
  setUserSkills,
  setDegreeName,
  setOtherStateAviable,
  setOtherStateId,
  setWillingToRelocate,
  setMobile,
  setRoleType,
  setTitle,
  setSignupId,
  setProfilePhotoPath,
  setIsVerified,
  setIsActive,
  setIsLocked,
  setZip,
  setStreet,
  setCityId,
  setStateId,
  setCountryId,
  setIsDentalExperience,
  setIsCertificateRequired,
  setQuestionnaireAnswers,
  setCategoryId,
  setIsProfileCompleted,
  setIsContractSigned,
  setCreatedAt,
  setUpdatedAt,
  setDeletedAt,
  setStepsCompleted,
  setCompanies,
  setAvatar,
  setUserExperiences,
  setWebsite,
  setTimeZoneId,
  setUserTimeZone,
  setTimeZone,
  setIsloggedin
} = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectAuthToken = (state) => state.user.authToken;
export const selectEmail = (state) => state.user.email;
export const selectFirstName = (state) => state.user.first_name;
export const selectLastName = (state) => state.user.last_name;
export const selectGender = (state) => state.user.gender;
export const selectMobile = (state) => state.user.mobile;
export const selectRoleType = (state) => state.user.role_type;
export const selectTitle = (state) => state.user.title;
export const selectSignupId = (state) => state.user.signup_id;
export const selectProfilePhotoPath = (state) => state.user.profile_photo_path;
export const selectIsVerified = (state) => state.user.is_verified;
export const selectIsActive = (state) => state.user.is_active;
export const selectIsLocked = (state) => state.user.is_locked;
export const selectZip = (state) => state.user.zip;
export const selectStreet = (state) => state.user.street;
export const selectCityId = (state) => state.user.city_id;
export const selectStateId = (state) => state.user.state_id;
export const selectCountryId = (state) => state.user.country_id;
export const selectIsDentalExperience = (state) =>
  state.user.is_dental_experience;
export const selectIsCertificateRequired = (state) =>
  state.user.is_certificate_required;
export const selectQuestionnaireAnswers = (state) =>
  state.user.questionnaire_answers;
export const selectCategoryId = (state) => state.user.category_id;
export const selectIsProfileCompleted = (state) =>
  state.user.is_profile_completed;
export const selectIsContractSigned = (state) => state.user.is_contract_signed;
export const selectCreatedAt = (state) => state.user.created_at;
export const selectUpdatedAt = (state) => state.user.updated_at;
export const selectDeletedAt = (state) => state.user.deleted_at;
export const selectStepsCompleted = (state) => state.user.steps_completed;
export const selectCompanies = (state) => state.user.companies;
export const selectAvatar = (state) => state.user.avatar;
export const selectUserExperiences = (state) => state.user.user_experiences;
export const selectUserSkills = (state) => state.user.user_skills;
export const selectUserLanguages = (state) => state.user.user_languages;
export const selectUserLocations = (state) => state.user.user_locations;
// export const selectOtherStateId = (state) => state.user.other_state_id;
export const selectWebsite = (state) => state.user.website;
export const selectTimeZoneId = (state) => state.user.time_zone_id;
export const selectUserTimeZone = (state) => state.user.user_time_zone;
export const selectTimeZone = (state) => state.user.time_zone;
export const selectOtherStateId = (state) => state.user.other_state_id;
export const selectIsloggedin = (state) => state.user.is_loggedin;
export default userSlice.reducer;
