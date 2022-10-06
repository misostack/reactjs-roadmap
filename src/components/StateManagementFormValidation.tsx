import React, { ChangeEvent, useEffect, useState } from 'react';

import * as yup from 'yup';

// import { debounce } from 'lodash';

const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

const initialStates = {
  formData: {
    fullname: '',
    email: ''
  },
  formValidationObserver: {
    isValid: false,
    dirty: false
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

const subcribeFormSchema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup
    .string()
    .required()
    // eslint-disable-next-line no-template-curly-in-string
    .test('is_valid', '${path}_valid_error', (value, context) => {
      if (value) {
        return EMAIL_REGEX.test(value);
      }
      return true;
    })
    // eslint-disable-next-line no-template-curly-in-string
    .test('is_unique', '${path}_unique_error', async (value, _context) => {
      if (value) {
        const isUnique = await fakeAPICall<boolean>(true);
        return isUnique;
      }
      return false;
    })
});

export default function StateManagementFormValidation() {
  // default state
  const [formData, setFormData] = useState(initialStates.formData);
  const [formValidationObserver, setFormValidationObserver] = useState(
    initialStates.formValidationObserver
  );
  // sync input's values with its state
  const syncInputValueState = (
    fieldName: FieldName,
    event: ChangeEvent<HTMLInputElement>
  ) => {
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
  };
  // validate data everytime formData changes
  useEffect(() => {
    // only run if form is dirty
    if (formValidationObserver.dirty) {
      subcribeFormSchema
        .validate(formData)
        .then(() => {
          setFormValidationObserver({
            ...formValidationObserver,
            isValid: true
          });
        })
        .catch(err => {
          setFormValidationObserver({
            ...formValidationObserver,
            isValid: !err
          });
        });
    }
  }, [formData]);
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
