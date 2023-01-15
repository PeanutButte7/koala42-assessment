import { IconChevronDown, IconX } from '@tabler/icons';
import { Fragment, useState } from 'react';
import { remove, useAppDispatch } from 'store';
import { CharacterTable } from 'components/CharacterTable';

interface CharacterTableRowProps {
    data: any;
    childrenData?: Array<any>;
}

export function CharacterTableRow({
    data,
    childrenData,
}: CharacterTableRowProps) {
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);
    const records = childrenData?.flat(0);

    function deleteCharacter() {
        dispatch(remove(data.ID));
    }

    return (
        <Fragment>
            <tr className='even:bg-white odd:bg-slate-100'>
                {!!records?.length ? (
                    <td>
                        <IconChevronDown
                            onClick={() => setExpanded(!expanded)}
                            className='cursor-pointer'
                        />
                    </td>
                ) : (
                    <td></td>
                )}
                {Object.keys(data).map((key, index) => (
                    <td className='p-3 text-center' key={index}>
                        {data[key]}
                    </td>
                ))}
                <td>
                    <IconX
                        onClick={deleteCharacter}
                        className='text-red-400 cursor-pointer'
                    />
                </td>
            </tr>
            {expanded &&
                !!records?.length &&
                // It's needed to map over the records array again in case both nemesis and secretes would exist
                // Even though the mockup data ever only has one of them
                records.map((record: any, index: number) => (
                    <tr key={index}>
                        <td colSpan={100}>
                            <CharacterTable inputData={record} />
                        </td>
                    </tr>
                ))}
        </Fragment>
    );
}
