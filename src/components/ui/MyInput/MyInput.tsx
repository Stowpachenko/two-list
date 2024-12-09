import React, { FC, forwardRef } from "react";
import { MyInputProps } from "./MyInput.props";
import styles from "./MyInput.module.css";

const MyInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => (
  <input
    ref={ref}
    className={`${styles.myInput}  ${props.className}`}
    {...props}
  />
));

export default MyInput;
