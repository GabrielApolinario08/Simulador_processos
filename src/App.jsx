import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'
import { BsFillHeptagonFill } from 'react-icons/bs'
function App() {

  const [estadoDiv1, setEstadoDiv1] = useState('processo01_inicial');
  const [estadoDiv2, setEstadoDiv2] = useState('processo02_inicial');
  const [simulacaoEmAndamento, setSimulacaoEmAndamento] = useState(false);

  useEffect(() => {
    if (simulacaoEmAndamento) {
      const interval = setInterval(() => {
        if (estadoDiv1 === 'processo_executando') {
          setEstadoDiv1('processo_espera');
          setEstadoDiv2('processo_executando');
        } else if (estadoDiv1 === 'processo_espera') {
          setEstadoDiv1('processo_pronto');
          setEstadoDiv2('processo_espera');
        } else if (estadoDiv1 === 'processo_pronto' && estadoDiv2 === 'processo_espera') {
          setEstadoDiv1('processo_executando')
          setEstadoDiv2('processo_pronto');
        }
      }, 2000); // Avança os estados a cada 1 segundo

      return () => clearInterval(interval);
    } else {
      if (estadoDiv1 === 'processo_espera') {
        const interval2 = setInterval(() => {
          setEstadoDiv1('processo_pronto')
          setEstadoDiv2('processo02_inicial')
          console.log("PRIMEIRO IF");
        }, 2000)
        return () => clearInterval(interval2)

      } else if (estadoDiv1 === 'processo_pronto') {
        const interval2 = setInterval(() => {
          if (estadoDiv2 !== 'processo02_inicial') {
            setEstadoDiv1('processo_executando')
            setEstadoDiv2('processo_pronto')
          } else {
            setEstadoDiv1('processo_executando')
          }

        }, 2000)
        return () => clearInterval(interval2)

      } else if (estadoDiv1 === 'processo_executando') {
        const interval2 = setInterval(() => {
          if (estadoDiv2 !== 'processo02_inicial') {
            setEstadoDiv1('processo01_inicial')
            setEstadoDiv2('processo_executando')
          } else {
            setEstadoDiv1('processo01_inicial')
          }

        }, 2000)
        return () => clearInterval(interval2)

      }
      if (estadoDiv2 === 'processo_executando' && estadoDiv1 === 'processo01_inicial') {
        const interval2 = setInterval(() => {
          setEstadoDiv2('processo02_inicial')
          console.log("ulrimo IF");
        }, 2000)
        return () => clearInterval(interval2)
      }
    }

  }, [estadoDiv1, estadoDiv2, simulacaoEmAndamento]);

  const iniciarSimulacao = () => {
    setEstadoDiv1('processo_executando');
    setEstadoDiv2('processo_pronto');
    setSimulacaoEmAndamento(true)
  };

  const finalizarSimulacao = () => {
    setSimulacaoEmAndamento(false);
  }


  return (
    <>
      <div className='container'>
        <div className='header'>
          <h1>SIMULADOR DE PROCESSOS</h1>
          <div className='container_btns'>
            <button className='btn_executar' onClick={iniciarSimulacao}>Executar simulador</button>
            <button className='btn_finalizar' onClick={finalizarSimulacao}>Finalizar simulador</button>
          </div>
        </div>
        <div className='container_processos'>
          <div className='estado executando'>
            <h2>Executando</h2>

          </div>
          <div className='estado espera'>
            <h2>Espera</h2>

          </div>
          <div className='estado pronto'>
            <h2>Pronto</h2>

          </div>

          <div className={`processo ${estadoDiv1}`}><BsFillHeptagonFill className='iconGreen' /></div>
          <div className={`processo02 ${estadoDiv2}`}><BsFillHeptagonFill className='iconRed' /></div>


        </div>
      </div>
    </>
  )
}

export default App
