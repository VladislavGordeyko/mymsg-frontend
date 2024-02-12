export interface ITextInput {
    value?: string,
    placeholder: string,
    label?: string,
    onChange: (value: string) => void, 
    suggestions?: string[],
    className?: string,
}