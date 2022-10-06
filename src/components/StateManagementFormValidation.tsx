/* eslint-disable no-template-curly-in-string */
import React, { ChangeEvent, useEffect, useState } from 'react';

import * as yup from 'yup';
import useDebounce from '../helpers/hooks.helpers';

// import { debounce } from 'lodash';

const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

type ErrorObject = {
  [field: string]: string[];
};

const initialStates = {
  formData: {
    fullname: '',
    email: ''
  },
  formValidationObserver: {
    isValid: false,
    dirty: false,
    errorObject: {}
  }
};

type FieldName = 'fullname' | 'email';

function fakeAPICall<T>(res: any): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('fake api call');
      resolve(res);
    }, 300);
  });
}

yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: 'invalid',
    required: 'required'
  }
});

/**
 * Convert yup error into an error object where the keys are the fields and the values are the errors for that field
 * @param {ValidationError} err The yup error to convert
 * @returns {ErrorObject} The error object
 */
export function yupErrorToErrorObject(err: yup.ValidationError): ErrorObject {
  const object: ErrorObject = {};

  err.inner.forEach(x => {
    if (x.path !== undefined) {
      object[x.path] = x.errors;
    }
  });

  return object;
}

const subcribeFormSchema = yup.object().shape({
  fullname: yup.string().required().label('fullname'),
  email: yup
    .string()
    .required()
    .label('email')
    // eslint-disable-next-line no-template-curly-in-string
    .test('is_valid', 'invalid', (value, context) => {
      if (value) {
        return EMAIL_REGEX.test(value);
      }
      return false;
    })
    // eslint-disable-next-line no-template-curly-in-string
    .test('is_unique', 'unique', async (value, _context) => {
      if (value && EMAIL_REGEX.test(value)) {
        const isUnique = await fakeAPICall<boolean>(true);
        return isUnique;
      }
      return true;
    })
});

export default function StateManagementFormValidation() {
  // default state
  const [formData, setFormData] = useState(initialStates.formData);
  const [formValidationObserver, setFormValidationObserver] = useState(
    initialStates.formValidationObserver
  );
  const debounceFormData = useDebounce(formData, 500);
  // sync input's values with its state
  const syncInputValueState = (
    fieldName: FieldName,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (formData[fieldName] !== event.target.value) {
      const newFormData = {
        ...formData
      };
      newFormData[fieldName] = event.target.value;
      setFormData(newFormData);
      if (!formValidationObserver.dirty) {
        setFormValidationObserver({
          ...formValidationObserver,
          dirty: true
        });
      }
    }
  };
  const validateData = (schema: typeof subcribeFormSchema, data: any) => {
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setFormValidationObserver({
          ...formValidationObserver,
          isValid: true,
          errorObject: {}
        });
      })
      .catch((err: yup.ValidationError) => {
        if (err) {
          const errorObject = yupErrorToErrorObject(err);

          setFormValidationObserver({
            ...formValidationObserver,
            isValid: !err,
            errorObject
          });
        }
      });
  };
  // validate data everytime formData changes

  useEffect(() => {
    validateData(subcribeFormSchema, debounceFormData);
  }, [debounceFormData]);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-96 p-8 shadow">
          <h1 className="mb-4">Nhan thong bao va qua tang dinh ky</h1>
          <p className="text-gray-400 mb-4">
            Bang cach dang ky thanh vien cua cong dong NEXTJSVIETNAM
          </p>
          <form>
            <div className="mb-4">
              <input
                value={formData.fullname}
                type="text"
                id="fullname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your name"
                onChange={e => syncInputValueState('fullname', e)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={formData.email}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
                onChange={e => syncInputValueState('email', e)}
                required
              />
            </div>
            <div>
              <p>{JSON.stringify(formValidationObserver.errorObject)}</p>
              <button
                disabled={!formValidationObserver.isValid}
                className="bg-red-800 hover:bg-red-600 focus:bg-red-600 text-white leading-16 py-2 block w-full disabled:opacity-50"
              >
                Subcribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
