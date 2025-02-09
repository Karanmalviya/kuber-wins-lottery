export const FormSchema = {
  firstName: {
    placeholderText: "Enter your first name",
    key: "firstName",
    options: {
      required: "Enter a name",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[^ ][A-Za-z-'.\s]+$/),
        message: "Enter a valid name.",
      },
    },
  },
  lastName: {
    placeholderText: "Enter your last name",
    key: "lastName",
    options: {
      required: "Enter a name",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[^ ][A-Za-z-'.\s]+$/),
        message: "Enter a valid name",
      },
    },
  },
  country: {
    placeholderText: "Select country",
    key: "country",
    options: {
      required: "required",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[^ ][A-Za-z-'.\s]+$/),
        message: "required",
      },
    },
  },
  dob: {
    placeholderText: "Date of birth",
    key: "dob",
    options: {
      required: "required",
      maxLength: {
        value: 20,
      },
      pattern: {
        value: RegExp(/.*/),
        message: "required",
      },
    },
  },
  phone: {
    placeholderText: "Enter phone number",
    key: "phone",
    options: {
      // required: "Enter a phone number",
      maxLength: {
        value: 90,
      },
      pattern: {
        // value: RegExp(/[0-9]{10}/),
        value: RegExp(/.*/),

        message: "Enter a valid phone number.",
      },
    },
  },
  email: {
    placeholderText: "Enter your email",
    key: "email",
    options: {
      required: "Enter a email address",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,})+$/),
        message: "Enter a valid email address.",
      },
    },
  },
  username: {
    placeholderText: "Enter your username",
    key: "username",
    options: {
      required: "Enter a username",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[^ ][A-Za-z0-9'.\s]+$/),
        message: "Enter a valid username",
      },
    },
  },
  id: {
    placeholderText: "Enter email address",
    key: "id",
    type: "id",
    options: {
      required: "Enter email address",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[^ ][A-Za-z-'.\s]+$/),
        message: "Enter a valid email address",
      },
    },
  },
  password: {
    placeholderText: "Enter your password",
    key: "password",
    type: "password",
    options: {
      required: "Enter password",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[0-9,a-z,A-Z]{5,}/),
        message: "Enter minimum 8 digit password",
      },
    },
  },
  confirmPassword: {
    placeholderText: "Enter your confirm password",
    key: "confirmPassword",
    type: "password",
    options: {
      required: "Enter confirm password",
      maxLength: {
        value: 90,
      },
      pattern: {
        value: RegExp(/[0-9,a-z,A-Z]{5,}/),
        message: "Confirm password does't match",
      },
    },
  },
};
