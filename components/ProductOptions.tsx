export default function ProductOptions({
    name,
    values,
    selectedOptions,
    setOptions
}: {
    name: string
    values: string[]
    selectedOptions: { [key: string]: string }
    setOptions: (name: string, value: string) => void
}) {
    return (
        <fieldset className="mt-3">
            <legend className="text-xl font-semibold">{name}</legend>
            <div className="inline-flex items-center flex-wrap">
                {values.map((value: string) => {
                    const id = `option-${name}-${value}`
                    const checked = selectedOptions[name] === value
                    return (
                        <label key={id} htmlFor={id}>
                            <input
                                className="sr-only"
                                type="radio"
                                id={id}
                                name={`option-${name}`}
                                value={value}
                                checked={checked}
                                onChange={() => setOptions(name, value)}
                            ></input>
                            <div
                                className={`p-2 my-3 text-lg rounded-full block cursor-pointer mr-3 ${
                                    checked ? 'text-white bg-gray-900' : 'text-gray-900 bg-gray-200'
                                }`}
                            >
                                <span className="px-2">{value}</span>
                            </div>
                        </label>
                    )
                })}
            </div>
        </fieldset>
    )
}
