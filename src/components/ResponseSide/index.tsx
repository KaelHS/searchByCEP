import { useCEP } from '../../hooks/useCEP';
import styles from './styles.module.scss';

export function ResponseSide() {

    const { axiosResponse } = useCEP();

    return(
        <div className={styles.container}>

            <h1>Seu CEP</h1>
            <table className={styles.resultTable}>
                <thead>
                    <tr>
                        <th>DDD</th>
                        <th>UF</th>
                        <th>Cidade</th>
                        <th>Bairro</th>
                        <th>Logradouro</th>
                        <th>Complemento</th>
                        <th>IBGE</th>
                    </tr>
                </thead>
                <tbody>
                    { axiosResponse && 
                        <tr>
                            <td>{axiosResponse.ddd}</td>
                            <td>{axiosResponse.uf}</td>
                            <td>{axiosResponse.localidade}</td>
                            <td>{axiosResponse.bairro}</td>
                            <td>{axiosResponse.logradouro}</td>
                            <td>{axiosResponse.complemento}</td>
                            <td>{axiosResponse.ibge}</td>
                        </tr>
                    }
                </tbody>
            </table>


        </div>
    );
}