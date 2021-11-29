import React, { useState, useEffect, useCallback } from "react";
import { csv } from 'd3';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import Footer from "components/Footer/Footer";

const csvUrl =
    'https://raw.githubusercontent.com/lopezbec/COVID19_Tweets_Dataset/main/Summary_Sentiment_ES/Sent_by_month.csv';



const formatData = oldData => {
    if (oldData == null)
        return null;
    let labels = [...new Set(oldData.map(item => item.Month + "/" + item.Year))];
    let negative = oldData.filter(item => item.Sentiment === 'negative').map(item => item.Count);
    let totaln = 0;
    for (let i of negative) totaln += parseInt(i);

    let positive = oldData.filter(item => item.Sentiment === 'positive').map(item => item.Count);
    let totalp = 0;
    for (let i of positive) totalp += parseInt(i);
    let neutral = oldData.filter(item => item.Sentiment === 'neutral').map(item => item.Count);
    let totalN = 0;
    for (let i of neutral) totalN += parseInt(i);
    let total = totalp + totaln + totalN;
    totaln = Math.floor(totaln * 100 / total);
    totalp = Math.floor(totalp * 100 / total);
    totalN = Math.floor(totalN * 100 / total);


    return {
        datasets: [
            {
                "name": "positive",
                "datos": totalp,
                "fill": "#8884d8"
            },
            {
                "name": "negative",
                "datos": totaln,
                "fill": "#83a6ed"
            },
            {
                "name": "neutral",
                "datos": totalN,
                "fill": "#82ca9d"
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
    const datos_vector = newData.datasets;

    return (
        <>

            <div className="content">
                <Row>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Cuenta mensual</CardTitle>
                            </CardHeader>
                            <CardBody>

                                <ResponsiveContainer width="80%" height={400}>
                                    <BarChart
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
                                        <Legend wrapperStyle={{
                                            position: "relative"
                                        }} />
                                        <Bar dataKey="Count" fill="#8884d8" />

                                    </BarChart>
                                </ResponsiveContainer>
                            </CardBody>
                        </Card>


                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h5">Sentimiento</CardTitle>
                            </CardHeader>
                            <CardBody>

                                <ResponsiveContainer width="95%" height={400}>
                                    <RadialBarChart
                                        innerRadius="10%"
                                        outerRadius="80%"
                                        data={datos_vector}
                                        startAngle={180}
                                        endAngle={0}

                                    >
                                        <RadialBar
                                            minAngle={15}
                                            label={{ fill: '#666', position: 'insideStart' }}
                                            background clockWise={true}
                                            dataKey='datos' />
                                        <Legend
                                            iconSize={10}
                                            width={120}
                                            height={140}
                                            layout='vertical'
                                            verticalAlign='right'
                                            align="right" />
                                        <Tooltip />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default PruebaRecharts