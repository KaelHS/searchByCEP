import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FaMapSigns, FaMapMarkerAlt } from 'react-icons/fa';
import { InputGroup, Icon, InputLeftElement, Input } from '@chakra-ui/react';
import animationData from '../../../public/globe.json'
import Lottie from 'react-lottie';

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

    search: string;
}

export function FormSide() {

    const { setLocaleResponses } = useCEP();

    const [radio, setRadio] = useState('');

    const { register, handleSubmit, formState, reset } = useForm<SearchLocaleData>({
        criteriaMode: 'all'
    });

    const { errors } = formState;

    const onSubmit:SubmitHandler<SearchLocaleData> = async (value, event) => {

        event?.defaultPrevented;

        const { data } = await api.get(`/${value.search}/json`);
        
        setLocaleResponses(data);

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
                    <InputGroup>
                    <InputLeftElement children={<FaMapMarkerAlt />}/>
                    <Input  
                        type="text"
                        placeholder="Entre com o CEP ( somente números )"
                        {...register('search', {
                            required: "É obrigatório preencher o CEP",
                            pattern: {
                                value: /^\d{8}/ ,
                                message: "CEP inválido"
                            },
                            maxLength: {
                                value: 8,
                                message: "CEP inválido ( tamanho incorreto )"
                            },
                            minLength: {
                                value: 8,
                                message: "CEP inválido ( tamanho incorreto )"
                            }
                        })}
                        
                        />
                        <ErrorMessage
                            errors={errors}
                            name="search"
                            render={({ messages }) => {
                            console.log("messages", messages);
                            return messages 
                                ? Object.entries(messages).map(([type, message]: [string, string]) => (
                                    <p key={type}>{message}</p>
                                ))
                                : null;
                            }}
                        />
                        </InputGroup>
                    
                <div className={styles.radiosButton}>
                    <label>
                        <input 
                            type="radio" 
                            value="cep"
                            checked={radio === 'cep'}
                            onChange={ ({target}) => setRadio(target.value)}
                        />
                            CEP
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="city"
                            checked={radio === "city"}
                            onChange={ ({target}) => setRadio(target.value)}
                        />
                            Cidade
                    </label>
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