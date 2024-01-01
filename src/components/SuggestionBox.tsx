import React from 'react'

interface SuggestionBoxProps  {
    showSuggestions: boolean;
    suggestions: string[];
    handleSuggestionClick: (item: string) => void;
    error: string;
}

function SuggestionBox(props: SuggestionBoxProps) {



  return (
    <> 
    { ((props.showSuggestions && props.suggestions.length > 1) || props.error) && 
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2">
            { props.error && props.suggestions.length < 1 && (
                <li className="text-red-500 p-1">{props.error}</li>
            )}

            {
                props.suggestions.map((item, index) => (
                    <li key={index} onClick={() => props.handleSuggestionClick(item)} className="cursor-pointer p-1 rounded hover:bg-gray-200">
                        {item}
                    </li>
                ))
            }
        </ul>
    }
    </>
  )
}

export default SuggestionBox