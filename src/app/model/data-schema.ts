export class patient {
    p_id: string;
    p_age: string;
    p_nationality: string;
    p_gender: string;
    p_barangay: string;
    p_work: string;
    p_date: string;
    p_status: number;
    p_date_status: string;
    c_status: number;
    p_test_result: string;
    p_relation_of_patients: string;
    p_travel_history: string;
    p_hospital: string;
    p_symptoms: string;
    p_diagnosed: string;
    return_positive_date: string;
}

export class contact {
    cont_id: any;
    barangay: any;
    brgy_capt: any;
    tel_no: any;
    cont_no: any;
}

export class barangay{
    brgy_name: string;
    brgy_totalcases: number;
}

export class add{
    page: any;
    pgender: any;
    pbarangay: any;
    pwork: any;
    pdate: any;
    pstatus: any;
}

export class LoginData{
    username: string;
    password: string;
}

