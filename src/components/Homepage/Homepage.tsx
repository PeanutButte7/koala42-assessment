import { CharacterTable } from 'components/CharacterTable';
import { useAppSelector } from 'store';

export function Homepage() {
    const characters = useAppSelector((state) => state.characters).characters;

    return <CharacterTable inputData={characters} />;
}
