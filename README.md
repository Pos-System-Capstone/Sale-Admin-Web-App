# ChangeLogs






## Typescript

`Type` cho phép client có thể bỏ thêm các addtional prop

```ts
type TypeSupportAdditionProp {
    requireProp: string;
    optionalProp?: number;
    [k: string]: any; // support addition
}

```
