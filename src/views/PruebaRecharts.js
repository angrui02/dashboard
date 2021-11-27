import React, { useState, useEffect } from "react";
import { csv } from 'd3';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

const csvUrl =
    'https://raw.githubusercontent.com/lopezbec/COVID19_Tweets_Dataset/main/Summary_Sentiment_ES/Sent_by_month.csv';

const data_aux = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const formatData = oldData => {
    if (oldData == null)
        return null;
    let labels = [...new Set(oldData.map(item => item.Month + "/" + item.Year))];
    let negative = oldData.filter(item => item.Sentiment === 'negative').map(item => item.Count);
    let positive = oldData.filter(item => item.Sentiment === 'positive').map(item => item.Count);
    let neutral = oldData.filter(item => item.Sentiment === 'neutral').map(item => item.Count);

    return {
        labels: labels,
        datasets: [
            {
                label: 'positive',
                data: positive,
                backgroundColor: 'rgb(0, 255, 0)',
                borderColor: 'green',
                tension: 0.1
            },
            {
                //type: 'bar',
                label: 'negative',
                data: negative,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'red',
                tension: 0.1
            },
            {
                label: 'neutral',
                data: neutral,
                backgroundColor: 'rgb(0, 0, 255)',
                borderColor: 'blue',
                tension: 0.1
            }
        ]
    }

}

function PruebaRecharts() {
    const [data, setData] = useState([]);

    useEffect(() => {
        csv(csvUrl).then(setData);
    }, []);

    const newData = formatData(data);
    return (
        <>

            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Sentimiento mensual</CardTitle>
                            </CardHeader>
                            <CardBody>


                                <BarChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Count" fill="#8884d8" />
                                    
                                </BarChart>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default PruebaRecharts