import { Wrapper } from './style';

import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

import { IRenderInputProps, IRenderSelectInputProps } from './types';

// Text Field
export const RenderTextInput = ({
  register,
  type,
  children,
  placeholder,
  containerClasses,
  inputClasses,
  labelClasses,
  labelName,
  disabled,
  errorClasses,
  errorMessage
}: IRenderInputProps) => {
  return (
    <Wrapper className={`formGroup ${containerClasses}`}>
      <input
        {...register}
        className={`formInput ${inputClasses}`}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
      />
      <span className="childrenClass">{children}</span>
      <label htmlFor={labelName} className={`formLabel ${labelClasses}`} data-content={labelName}>
        <span className="hidden--visually">{labelName}</span>
      </label>
      <div className={`inputError ${errorClasses}`}>
        {errorMessage && <span className="textDanger textRight">{errorMessage}</span>}
      </div>
    </Wrapper>
  );
};

// custom select
export const CustomRenderSelectInput = ({
  register,
  placeholder,
  containerClasses,
  labelClasses,
  options = [],
  labelName,
  disabled,
  errorClasses,
  errorMessage,
  control
}: IRenderSelectInputProps) => {
  return (
    <>
      <Controller
        name={register.name}
        control={control}
        render={({ field }) => (
          <Wrapper className={`formGroup ${containerClasses}`}>
            <select
              {...register}
              disabled={disabled || false}
              onChange={field.onChange}
              placeholder={placeholder}
              className="demoMain"
              multiple={true}
            >
              <option value="">{}</option>
              {options?.map((val) => {
                return (
                  <option key={val.value} value={val.value}>
                    {val?.label}
                  </option>
                );
              })}
            </select>
            <label
              htmlFor={labelName}
              className={`${
                field.value ? `floatingFormLabel ${labelClasses} ` : `formLabel ${labelClasses}`
              }  `}
              data-content={labelName}
            >
              <span className="hidden--visually">{labelName}</span>
            </label>
          </Wrapper>
        )}
      />

      {errorMessage && (
        <div className={`inputError ${errorClasses}`}>
          {errorMessage && <span className="textDanger textRight">{errorMessage}</span>}
        </div>
      )}
    </>
  );
};

// React Select Field
export const RenderSelectInput = ({
  register,
  placeholder,
  containerClasses,
  labelClasses,
  options = [],
  labelName,
  errorClasses,
  errorMessage,
  isMulti,
  isSearchable,
  control
}: any) => {
  return (
    <>
      <Controller
        name={register.name}
        control={control}
        render={({ field }) => (
          <Wrapper className={`formGroup ${containerClasses}`}>
            <ReactSelect
              {...register}
              classNamePrefix="demoClass"
              isSearchable={isSearchable}
              className="demoMain"
              options={options}
              placeholder={placeholder}
              onChange={field.onChange}
              isMulti={isMulti}
            />
            <label
              htmlFor={labelName}
              className={`${
                !field.value ? `formLabel ${labelClasses}` : `floatingFormLabel ${labelClasses}`
              }  `}
              data-content={labelName}
            >
              <span className="hidden--visually">{labelName}</span>
            </label>
          </Wrapper>
        )}
      />
      <div className={`inputError ${errorClasses}`}>
        {errorMessage && <span className="textDanger textRight">{errorMessage}</span>}
      </div>
    </>
  );
};
