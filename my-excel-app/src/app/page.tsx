'use client' 

import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver'; 
import { useState } from 'react'; 

export default function Home() {

  // Modelo de Planilha Excel Base
  const [data, setData] = useState([
    { Data: '01/01/2024', Descrição: 'Exemplo de Receita', Categoria: 'Receita', Valor: 'R$ 1.000' },
    { Data: '02/01/2024', Descrição: 'Exemplo de Despesa', Categoria: 'Despesa', Valor: 'R$ 500' },
    { Data: '03/01/2024', Descrição: 'Exemplo de Receita', Categoria: 'Receita', Valor: 'R$ 1.200' },
    { Data: '04/01/2024', Descrição: 'Exemplo de Despesa', Categoria: 'Despesa', Valor: 'R$ 300' }
  ]);
  
  // Função para gerar e baixar o arquivo Excel
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); 
    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); 
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); 
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'planilha_base.xlsx'); 
  };

  // Função para atualizar os dados quando o usuário altera um valor na tabela
  const handleInputChange = (e, rowIndex, key) => {
    const newData = [...data]; 
    newData[rowIndex][key] = e.target.value; 
    setData(newData); 
  };

  return (
    <div className="container">
      <h1 className='text-6xl'>Planilha Excel Base</h1>
      <button onClick={handleDownload}>Baixar Planilha</button> 
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data).map((key) => <th key={key}>{key}</th>)} {/* Cabeçalho da tabela */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((key) => (
                <td key={key}>
                  <input
                    type="text"
                    value={row[key]}
                    onChange={(e) => handleInputChange(e, rowIndex, key)} // Campo de entrada para editar os dados
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
