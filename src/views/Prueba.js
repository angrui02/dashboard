import React, { useState, useEffect } from "react";

import { Line} from "react-chartjs-2";
import { csv } from 'd3';

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

function Prueba() {
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
                                <Line
                                    data={newData}
                                />
                            </CardBody>
                            <CardFooter>
                                <hr />
                                <div className="stats">
                                    <p>datos de sentimientos</p>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Prueba