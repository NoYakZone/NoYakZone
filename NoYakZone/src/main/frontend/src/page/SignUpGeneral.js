import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/SignUp.css';
import { useHistory } from 'react-router-dom';

const SignUpGeneral = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        password: '',
        birth: '',
        phone1: '',
        phone2: '',
        phone3: '',
        email: '',
        address: '',
        official: false
    });

    const [idValid, setIdValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePhoneChange = (e) => {
        const { name, value } = e.target;
        const phoneInput = value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자는 제거

        if (phoneInput.length <= 3 && name === 'phone1') {
            setFormData({
                ...formData,
                [name]: phoneInput
            });
        } else if (phoneInput.length <= 4 && name === 'phone2') {
            setFormData({
                ...formData,
                [name]: phoneInput
            });
        } else if (phoneInput.length <= 4 && name === 'phone3') {
            setFormData({
                ...formData,
                [name]: phoneInput
            });
        }
    };

    const handlePhoneKeyUp = (e) => {
        const { name, value } = e.target;
        const phoneInput = value.replace(/[^0-9]/g, '');

        if (phoneInput.length === 3 && name === 'phone1') {
            document.getElementById('phone2').focus();
        } else if (phoneInput.length === 4 && name === 'phone2') {
            document.getElementById('phone3').focus();
        } else if (phoneInput.length === 0 && name === 'phone2') {
            document.getElementById('phone1').focus();
        } else if (phoneInput.length === 0 && name === 'phone3') {
            document.getElementById('phone2').focus();
        }
    };

    const history = useHistory();

    const validateInputs = () => {
        const userIdRegex = /^[a-zA-Z0-9]{4,30}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,50}$/;

        if (!userIdRegex.test(formData.id)) {
            setIdValid(false);
            setValidationMessage('아이디는 영어와 숫자만 포함하여 4~30 글자 사이여야 합니다.');
            return false;
        } else {
            setIdValid(true);
        }

        if (!passwordRegex.test(formData.password)) {
            setPasswordValid(false);
            setValidationMessage('비밀번호는 영어와 숫자를 포함하여 8~50 글자 사이여야 합니다.');
            return false;
        } else {
            setPasswordValid(true);
        }

        return true;
    };

    const checkIdAvailability = () => {
        axios.get(`/userData/checkId/${formData.id}`)
            .then(response => {
                if (response.data) {
                    setIdValid(true);
                    setValidationMessage('아이디를 사용할 수 있습니다.');
                    alert('아이디를 사용할 수 있습니다.');
                } else {
                    setIdValid(false);
                    setValidationMessage('이미 사용 중인 아이디입니다.');
                    alert('이미 사용 중인 아이디입니다.');
                }
            })
            .catch(error => {
                console.error('아이디 검증 중 오류가 발생했습니다.', error);
                alert('아이디 검증 중 오류가 발생했습니다.');
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateInputs() && idValid) {
            const phoneNumber = `${formData.phone1}${formData.phone2}${formData.phone3}`;
            if (phoneNumber.length !== 11) {
                alert('전화번호는 총 11자리여야 합니다.');
                return;
            }

            const birthDate = new Date(formData.birth);
            const formattedBirth = `${birthDate.getFullYear().toString().slice(-2)}${("0" + (birthDate.getMonth() + 1)).slice(-2)}${("0" + birthDate.getDate()).slice(-2)}`;

            const userData = { 
                id: formData.id,
                name: formData.name,
                password: formData.password,
                birth: formattedBirth,
                phone: phoneNumber,
                email: formData.email,
                address: formData.address,
                official: formData.official
            };

            axios.post('/userData', userData)
                .then(response => {
                    console.log('Registration successful:', response.data);
                    history.push('/'); // 메인 페이지로 리디렉션
                })
                .catch(error => {
                    console.error('There was an error registering the user!', error);
                });
        } else {
            alert(validationMessage);
        }
    };

    return (
        <div className="SignUpContainer">
            <h2>일반인 회원가입</h2>
            <form onSubmit={handleSubmit} className="SignUpForm">
                <label htmlFor="id">
                    아이디:
                    <div className="flex-row">
                        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} />
                        <button type="button" onClick={checkIdAvailability}>입력 검증</button>
                    </div>
                    {!idValid && <span className="validationMessage">{validationMessage}</span>}
                </label>
                <label htmlFor="name">
                    이름:
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label htmlFor="password">
                    비밀번호:
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    {!passwordValid && <span className="validationMessage">{validationMessage}</span>}
                </label>
                <label htmlFor="birth">
                    생년월일:
                    <input type="date" id="birth" name="birth" value={formData.birth} onChange={handleChange} />
                </label>
                <label htmlFor="phone">
                    전화번호:
                    <div className="flex-row">
                        <input type="text" id="phone1" name="phone1" value={formData.phone1} onChange={handlePhoneChange} onKeyUp={handlePhoneKeyUp} maxLength="3" />
                        <input type="text" id="phone2" name="phone2" value={formData.phone2} onChange={handlePhoneChange} onKeyUp={handlePhoneKeyUp} maxLength="4" />
                        <input type="text" id="phone3" name="phone3" value={formData.phone3} onChange={handlePhoneChange} onKeyUp={handlePhoneKeyUp} maxLength="4" />
                    </div>
                </label>
                <label htmlFor="email">
                    이메일:
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </label>
                <label htmlFor="address">
                    주소:
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} />
                </label>

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignUpGeneral;
