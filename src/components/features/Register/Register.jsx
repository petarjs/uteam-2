// import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import './Register.scss';

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);
  return (
    <div className="register">
      <div className="register__content">
        <h2 className="register__title">uTeam - Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="register__field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              className={`register__input ${errors.name && 'invalid'}`}
              placeholder="Name"
              {...register('name', { required: 'Name is required' })}
              onKeyUp={() => {
                trigger('name');
              }}
            />
          </div>
          {errors.name && <p className="register__error-message">{errors.name.message}</p>}

          <div className="register__field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className={`register__input ${errors.email && 'invalid'}`}
              placeholder="Email"
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              onKeyUp={() => {
                trigger('email');
              }}
            />
          </div>
          {errors.email && <p className="register__error-message">{errors.email.message}</p>}

          <div className="register__field">
            <label htmlFor="password">Password:</label>
            <input
              className={`register__input ${errors.password && 'invalid'}`}
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', {
                required: 'Paswword is required',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters long',
                },
                maxLength: {
                  value: 15,
                  message: 'Your password must not be longer than 15 characters',
                },
              })}
              onKeyUp={() => {
                trigger('password');
              }}
            />
          </div>
          {errors.password && <p className="register__error-message">{errors.password.message}</p>}

          <div className="register__field">
            <label htmlFor="upload_file">Profile Photo</label>
            <input
              type="file"
              id="upload_file"
              accept=".png, .jpg, .jpeg"
              placeholder="Upload File"
              {...register('file')}
            />
          </div>

          <p></p>

          <span> Already have an account? </span>
          <input type="submit" value="submit" className="register__btn" />
        </form>
      </div>
    </div>
  );
};

// const RegistrationForm = () => {
//   const initialValues = { name: '', email: '', password: '', password2: '', file: '' };
//   const [formValues, setFormValue] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValue({ ...formValues, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(formValues));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     // console.log(formErrors);
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//     }
//   }, [formErrors]);

//   const validate = (values) => {
//     const errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.username) {
//       errors.name = 'Name is required!';
//     }
//     if (!values.email) {
//       errors.email = 'Email is required!';
//     } else if (!regex.test(values.email)) {
//       errors.email = 'This is not a valid email format!';
//     }
//     if (!values.password) {
//       errors.password = 'Password is required';
//     } else if (values.password.length < 4) {
//       errors.password = 'Password must be more than 4 characters';
//     } else if (values.password.length > 10) {
//       errors.password = 'Password cannot exceed more than 10 characters';
//     }
//     if (values.password !== values.password2) {
//       errors.password2 = 'Passwords doesn`t match';
//     }
//     if (values.file === '') {
//       errors.file = 'You need to upload the photo';
//     }
//     return errors;
//   };

//   return (
//     <div className="register">
//       <div className="register__content">
//         <h2 className="register__title">uTeam - Register</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="register__field">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Name"
//               value={formValues.name}
//               onChange={handleChange}
//             />
//           </div>
//           <p>{formErrors.name}</p>

//           <div className="register__field">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Email"
//               value={formValues.email}
//               onChange={handleChange}
//             />
//           </div>
//           <p>{formErrors.email}</p>

//           <div className="register__field">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={formValues.password}
//               onChange={handleChange}
//             />
//           </div>
//           <p>{formErrors.password}</p>
//           <div className="register__field">
//             <label htmlFor="password2">Repeat Password:</label>
//             <input
//               type="password"
//               id="password2"
//               name="password2"
//               placeholder="Repeat password"
//               value={formValues.password2}
//               onChange={handleChange}
//             />
//           </div>
//           <p>{formErrors.password2}</p>

//           <div className="register__field">
//             <label htmlFor="upload_file">Profile Photo</label>
//             <input
//               type="file"
//               id="upload_file"
//               name="file"
//               accept=".png, .jpg, .jpeg"
//               placeholder="Upload File"
//               value={formValues.file}
//               onChange={handleChange}
//             />
//           </div>

//           <p>{formErrors.file}</p>

//           <span> Already have an account? </span>
//           <button> Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default Registration;
