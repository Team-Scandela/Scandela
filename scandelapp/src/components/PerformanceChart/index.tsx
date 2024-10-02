import React, { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartContainer, Card, CardTitle } from './elements';
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameDay,
    isWithinInterval,
    subMonths,
    addMonths,
    subWeeks,
    addWeeks,
} from 'date-fns';
import { Yellow, DarkYellow, DarkGrey, Grey } from '../../colors';

const PerformanceChart = ({ data, title }: { data: any; title: string }) => {
    const [timeRange, setTimeRange] = useState('month');
    const [currentDate, setCurrentDate] = useState(new Date());

    const filterData = (data: any, range: string) => {
        let filteredData;

        switch (range) {
            case 'month':
                filteredData = data.filter((item: any) => {
                    const itemDate = new Date(item.date);
                    return isWithinInterval(itemDate, {
                        start: startOfMonth(currentDate),
                        end: endOfMonth(currentDate),
                    });
                });
                break;
            case 'week':
                filteredData = data.filter((item: any) => {
                    const itemDate = new Date(item.date);
                    return isWithinInterval(itemDate, {
                        start: startOfWeek(currentDate),
                        end: endOfWeek(currentDate),
                    });
                });
                break;
            case 'day':
                filteredData = data.filter((item: any) => {
                    const itemDate = new Date(item.date);
                    return isSameDay(itemDate, currentDate);
                });
                break;
            case 'year':
                filteredData = data.filter((item: any) => {
                    const itemDate = new Date(item.date);
                    return itemDate.getFullYear() === currentDate.getFullYear();
                });
                break;
            case 'all':
                filteredData = data;
                break;
            default:
                filteredData = data;
        }

        return filteredData;
    };

    const handleTimeRangeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setTimeRange(event.target.value);
    };

    const handlePrevious = () => {
        if (timeRange === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        } else if (timeRange === 'week') {
            setCurrentDate(subWeeks(currentDate, 1));
        } else if (timeRange === 'day') {
            setCurrentDate(subWeeks(currentDate, 1));
        } else if (timeRange === 'year') {
            setCurrentDate(subWeeks(currentDate, 1));
        }
    };

    const handleNext = () => {
        if (timeRange === 'month') {
            setCurrentDate(addMonths(currentDate, 1));
        } else if (timeRange === 'week') {
            setCurrentDate(addWeeks(currentDate, 1));
        } else if (timeRange === 'day') {
            setCurrentDate(addWeeks(currentDate, 1));
        } else if (timeRange === 'year') {
            setCurrentDate(addWeeks(currentDate, 1));
        }
    };

    const filteredData = filterData(data, timeRange);
    const chartData =
        filteredData.length > 0 ? filteredData : [{ date: '', value: 0 }];

    return (
        <Card>
            <CardTitle>
                {title}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={handlePrevious}
                        style={{
                            color: Yellow,
                            backgroundColor: DarkYellow,
                            border: `1px solid ${DarkYellow}`,
                        }}
                    >
                        ←
                    </button>
                    <select
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        style={{
                            color: DarkGrey,
                            backgroundColor: Grey,
                            border: `1px solid ${DarkYellow}`,
                        }}
                    >
                        <option value="all">All</option>
                        <option value="year">Year</option>
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="day">Day</option>
                    </select>
                    <button
                        onClick={handleNext}
                        style={{
                            color: Yellow,
                            backgroundColor: DarkYellow,
                            border: `1px solid ${DarkYellow}`,
                        }}
                    >
                        →
                    </button>
                </div>
            </CardTitle>

            <ChartContainer>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer>
        </Card>
    );
};

export default PerformanceChart;
