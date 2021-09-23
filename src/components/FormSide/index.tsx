import { FormEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Lottie from 'react-lottie';
import animationData from '../../../public/globe.json'
import { FaMapSigns } from 'react-icons/fa';

import { useCEP } from "../../hooks/useCEP";
import { api } from "../../services/api";

import styles from './styles.module.scss';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

interface SearchLocaleData {
    uf?: string;
    city?:string;
    search: string;
}

export function FormSide() {

    const { setLocaleResponses } = useCEP();

    const { register, handleSubmit, formState, reset } = useForm();

    const { errors } = formState;

    const onSubmit:SubmitHandler<SearchLocaleData> = async (value, event) => {

        event?.defaultPrevented;

        console.log(value);

        const { data } = await api.get(`/${value.search}/json`);
        
        setLocaleResponses(data);

        console.log(data)

        reset(value);
      }

      useEffect(() => {
        if (formState.isSubmitSuccessful) {
          reset({ search: '' });
        }
      }, [formState, reset]);

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
            <form onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="text"
                    {...register('search', {
                        required: {
                            value: true,
                            message: "É obrigatório preencher o CEP"
                        },
                        pattern: {
                            value: /[0-9]{8}/ ,
                            message: "CEP inválido"
                        },
                        valueAsNumber:true,
                    })}
                    placeholder="Entre com o CEP ( somente números )" 
                    />
                    
                <div className={styles.radiosButton}>
                    <label><input type="radio" />CEP</label>
                    <label><input type="radio" />Cidade</label>
                </div>
                <button 
                    type="submit"
                    
                >
                    Buscar
                </button>
            </form>

            <div>{}</div>
        </div>
    );
}