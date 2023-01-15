import { CharacterTableRow } from 'components/CharacterTable';

interface TableProps {
    inputData: Array<any>;
}

export function CharacterTable({ inputData }: TableProps) {
    if (inputData === undefined || !inputData.length) return null;

    const rows = inputData.map((data: any) => data);
    let headers = Object.keys(inputData[0].data);

    return (
        <table className='m-5'>
            <thead>
                <tr className='[&>th]:p-3'>
                    <th></th>
                    {/* Column for the expand icon */}
                    {headers.map((header: string, index: number) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th></th>
                    {/* Column for the delete icon */}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index: number) => (
                    <CharacterTableRow
                        key={row.data.ID + index} // This is a hack to make sure the key is unique since the mockup data don't have unique IDs
                        data={row.data}
                        childrenData={getChildren(row.children)}
                    />
                ))}
            </tbody>
        </table>
    );
}

function getChildren(rowChildren: any) {
    if (!rowChildren) return;

    const childrenKeys = Object.keys(rowChildren);
    return childrenKeys.map((key) => rowChildren[key].records); // returns array with nemesis and children
}
