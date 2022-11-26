interface AuthFormData {
  email: string;
  password: string;
}
type FormValue<Type> = {
  [Property in keyof Type]: Type[Property];
};
export type AuthFormValue = FormValue<AuthFormData>;
