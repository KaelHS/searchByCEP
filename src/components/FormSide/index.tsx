import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { useCEP } from "../../hooks/useCEP";
import Lottie from 'react-lottie';
import animationData from '../../../public/globe.json'
import { FaMapSigns } from 'react-icons/fa';

import styles from './styles.module.scss';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

export function FormSide() {

    const [ search, setSearch ] = useState('');
    const { setLocaleResponses } = useCEP();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { data } = await api.get(`/${search}/json`);

        setLocaleResponses(data);

        setSearch('');
      }

    return(
        <div className={styles.container}>
            <h1><FaMapSigns /><span>Teu</span>Cep</h1>
            <div className={styles.animation}>
                
                <Lottie options={defaultOptions}
                    height={200}
                    width={200}
                    direction={1}
                    isStopped={false}
                    isPaused={false}
                />

            </div>
            <form onSubmit={handleSubmit}>
            <input 
                required
                type="text" 
                placeholder="Entre com o CEP ( somente números )" 
                value={search}
                onChange={({ target }) => setSearch(target.value)}/>
            <div className={styles.radiosButton}>
                <label><input type="radio" />CEP</label>
                <label><input type="radio" />Cidade</label>
            </div>
            <button type="submit">Buscar</button>
            </form>

            <div>{}</div>
        </div>
    );
}