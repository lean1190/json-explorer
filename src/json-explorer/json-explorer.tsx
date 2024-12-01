interface Props {
    jsonObject: object;
}

export default function JsonExplorer({ jsonObject }: Props) {
    return <pre>{jsonObject.toString()}</pre>;
}