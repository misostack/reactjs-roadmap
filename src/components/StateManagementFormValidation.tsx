/* eslint-disable no-template-curly-in-string */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

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
    dirty: {},
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
  const debounceFormData = useDebounce(formData, 300);
  const [step, setStep] = useState<'default' | 'thank'>('default');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const classNames =
    'bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
  // methods
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
  // Handle events
  const onBlurField = (field: string) => {
    if (!Reflect.get(formValidationObserver, field)) {
      const dirty = formValidationObserver.dirty;
      Reflect.set(dirty, field, true);
      setFormValidationObserver({
        ...formValidationObserver,
        dirty
      });
    }
  };
  // sync input's values with its state
  const onFieldChange = (
    fieldName: FieldName,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (formData[fieldName] !== event.target.value) {
      const newFormData = {
        ...formData
      };
      newFormData[fieldName] = event.target.value;
      setFormData(newFormData);
      setFormValidationObserver({
        ...formValidationObserver
      });
    }
  };
  // onFormSubmit
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.email === 'learnenoughtobebetter@nextjsvietnam.com') {
      return setErrorMessage('You have been registered before!');
    }
    return fakeAPICall(formData)
      .then((res: any) => {
        setSuccessMessage(`Xin chuc mung <strong>${res.fullname}</strong>, ban da dang ky thanh cong. Ban
        se som nhan duoc qua tang cua he thong!`);
        setStep('thank');
      })
      .catch(err => {
        setErrorMessage(err);
      });
  };

  // validate data everytime formData changes
  useEffect(() => {
    validateData(subcribeFormSchema, debounceFormData);
  }, [debounceFormData]);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-96 p-8 border border-gray-200 shadow">
          <h1 className="mb-4">Nhan thong bao va qua tang dinh ky</h1>
          <p className="text-gray-400 mb-4">
            Bang cach dang ky thanh vien cua cong dong NEXTJSVIETNAM
          </p>
          {step === 'default' && (
            <form onSubmit={onFormSubmit}>
              <div className="mb-4 bg-red-300">{errorMessage}</div>
              <div className="mb-4">
                <input
                  value={formData.fullname}
                  type="text"
                  id="fullname"
                  className={`${classNames} ${
                    Reflect.get(formValidationObserver.dirty, 'fullname') &&
                    Reflect.has(formValidationObserver.errorObject, 'fullname')
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  }`}
                  placeholder="Your name"
                  onChange={e => onFieldChange('fullname', e)}
                  onBlur={e => onBlurField('fullname')}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={formData.email}
                  id="email"
                  className={`${classNames} ${
                    Reflect.get(formValidationObserver.dirty, 'email') &&
                    Reflect.has(formValidationObserver.errorObject, 'email')
                      ? 'border border-red-600'
                      : 'border border-gray-300'
                  }`}
                  placeholder="Email"
                  onChange={e => onFieldChange('email', e)}
                  onBlur={e => onBlurField('email')}
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
          )}
          {step === 'thank' && (
            <div
              className="mb-4 bg-green-400 p-8"
              dangerouslySetInnerHTML={{
                __html: successMessage
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
