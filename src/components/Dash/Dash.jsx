import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Dash = () => {
    const [dados, setDados] = useState([])
    
    const [opacity, setOpacity] = React.useState({
        uv: 1,
        pv: 1,
    });

    const handleMouseEnter = (o) => {
        const { dataKey } = o;

        setOpacity((op) => ({ ...op, [dataKey]: 0.5 }));
    };

    const handleMouseLeave = (o) => {
        const { dataKey } = o;

        setOpacity((op) => ({ ...op, [dataKey]: 1 }));
    };

    useEffect(() => {
        fetch('http://localhost:5000/dados')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setDados(res)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    ;

    return (
        <div style={{ width: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    width={500}
                    height={300}
                    data={dados}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="data" />
                    <YAxis dataKey="temperatura" domain={[20, 40]}/>
                    <Tooltip />
                    <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                    <Line type="monotone" dataKey="data" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="temperatura" strokeOpacity={opacity.uv} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Dash;