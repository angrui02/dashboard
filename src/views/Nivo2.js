import React, { useState, useEffect } from "react"
import { csv } from 'd3';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    UncontrolledCarousel
} from "reactstrap";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
const csvUrl =
    'https://raw.githubusercontent.com/lopezbec/COVID19_Tweets_Dataset/main/Summary_Sentiment_ES/Sent_by_month.csv';

let min = 0;
let max = 0;

const formatData = oldData => {
    if (oldData == null)
        return null;
    let labels = [...new Set(oldData.map(item => item.Month + "/" + item.Year))];
    let negative = oldData.filter(item => item.Sentiment === 'negative').map(item => item.Count);
    let positive = oldData.filter(item => item.Sentiment === 'positive').map(item => item.Count);
    let neutral = oldData.filter(item => item.Sentiment === 'neutral').map(item => item.Count);

    let newData = [];
    for (let i = 0; i < labels.length; ++i) {
        newData.push({
            name: labels[i],
            pos: positive[i],
            neg: negative[i],
            neu: neutral[i]
        });
        min = Math.min(positive[i], negative[i], neutral[i], min);
        max = Math.max(positive[i], negative[i], neutral[i], max);
    }
    return newData;
}

const tweets = [
    {
        caption: '@trigonometricas',
        header: "Me han ofrecido dar clases particulares por 4€ la hora, es indignante!!!! #profesenlucha",
        key: 1,
        src: 'https://picsum.photos/id/123/1200/600'
    },
    {
        caption: '@derivadas',
        header: "Contratos de 8 horas pero llevo trabajando de 10am a 12pm toda la semana!!",
        key: 2,
        src: 'https://picsum.photos/id/456/1200/600'
    },
    {
        caption: '@integrales',
        header: "No puedo más",
        key: 3,
        src: 'https://picsum.photos/id/678/1200/600'
    }
]

const dataRadar = [
    {
        "subject": "Arte",
        "A": 40,
        "B": 110,
        "fullMark": 150
    },
    {
        "subject": "Hostelería",
        "A": 98,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "Educación",
        "A": 86,
        "B": 130,
        "fullMark": 150
    },
    {
        "subject": "Turismo",
        "A": 99,
        "B": 100,
        "fullMark": 150
    }
]



function Nivo2() {
    const [data, setData] = useState([]);

    useEffect(() => {
        csv(csvUrl).then(setData);
    }, []);

    const newData = formatData(data);

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h5">Sentimientos de los tweets</CardTitle>
                            <p className="card-category">Positivo, neutral y negativo</p>
                        </CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="99%" aspect={3}>
                                <BarChart
                                    data={newData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 30,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="1 1" />
                                    <XAxis dataKey="name" />
                                    <YAxis domain={[min, max]} />
                                    <Tooltip />
                                    <Bar dataKey="pos" fill="#8884d8" />
                                    <Bar dataKey="neu" fill="#82ca9d" />
                                    <Bar dataKey="neg" fill="#ffc658" />
                                    <Legend verticalAlign="top"
                                        wrapperStyle={{
                                            position: 'relative'
                                        }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardBody>
                        <CardFooter>
                            <hr />
                            Gráfica que muestra por meses 2020 y 2021 los sentimientos de los tweets analizados
                        </CardFooter>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle tag="h5">Denuncias laborales</CardTitle>
                            <p className="card-category">Tweets más recientes</p>
                        </CardHeader>
                        <UncontrolledCarousel
                            items={tweets}

                        />
                    </Card>
                </Col>
                <Col>
                    <Card className="card-stats">
                        <CardBody>
                            <ResponsiveContainer width="99%" height={300}>

                                <RadarChart outerRadius={90} data={dataRadar}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                    <Radar name="Explotación laboral" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Radar name="Abusos" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>

                        </CardBody>
                        <CardFooter>
                            <hr />
                            <div className="stats">
                                <i className="fas fa-sync-alt" /> Update Now
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>



        </div>
    );
}

export default Nivo2