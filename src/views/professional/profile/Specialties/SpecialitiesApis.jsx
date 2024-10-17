import axios from "axios";

export async function GetSpecialities() {
    const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
    await axios.get(`${API_BASE_URL}/specialties`, {
        headers: {
            method: "GET",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => { return res.data.data });
}


export async function PostSpecialities(UserId, categoriesId) {
    const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
    const data = {
        sub_category_ids: categoriesId
    }
    await axios.put(`${API_BASE_URL}/specialties/${UserId}`, data, {
        headers: {
            method: "PUT",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => { return res }).catch(err => { return err });
}



export async function UpdatedQuestionnaire(JSONstring) {
    const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
    await axios.put(`${API_BASE_URL}/profile/questionnaire`, {
        questionnaire_answers: JSONstring
    }, {
        headers: {
            method: "PUT",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
    }).then((res) => { return res }).catch(err => { return err });
}

