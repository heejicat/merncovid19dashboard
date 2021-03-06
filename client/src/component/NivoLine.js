import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

import { covidData } from '../API';

function NivoLine() {
    const [lineData, setLineData] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            let data = await covidData();
            
            // to get new cases and date by destructuring
            let result = data.map(({ date:x, new_cases:y}) => {
                const date = x.split('T')[0];  

                return ({x:date, y})
            });
            
            // data into graph
            let line = [({
                "id" : "New Cases",
                "color" : "hsl(233, 50%, 30%)",
                "data" : result
            })];
            
            setLineData(line);
        };

        fetchMyAPI();
    }, []);
    
    return (
        <div id="graph">
            <ResponsiveLine onClick={(lineData) => console.log(lineData)}
                data={lineData}
                margin={{ top: 50, right: 110, bottom: 50, left: 50 }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d",
                    useUTC: false,
                    precision: "day"
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    format: "%b %d",
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -38,
                    tickValues: 20,
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                }}
                theme={{
                    tooltip: {
                        container: { color: 'black' }
                    }
                }}
                colors={{ scheme: 'blues' }}
                enableGridX={false}
                enablePoints={false}
                pointSize={10}
                pointColor={{ from: 'color' }}
                pointBorderWidth={0}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={true}
            />
        </div>
    );
}


export default NivoLine;