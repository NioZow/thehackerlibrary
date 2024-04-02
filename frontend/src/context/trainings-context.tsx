import { Training } from '@/components/elements/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface TrainingsContextType {
    trainings: Training[]
}

const defaultTrainingContext = {
    trainings: []
} satisfies TrainingsContextType

export const TrainingsContext = createContext<TrainingsContextType>(defaultTrainingContext);

export const useTrainings = () => useContext(TrainingsContext)

interface Props {
    children?: ReactNode
}

const TrainingsProvider = ({children}: Props) => {
    const [trainings, setTrainings] = useState<Training[]>([])

    useEffect(() => {
        fetch('http://localhost:8000/api/training')
        .then(res => res.json())
        .then(setTrainings)
    }, [])

    return <TrainingsContext.Provider value={{trainings}}>{children}</TrainingsContext.Provider>
}

export default TrainingsProvider