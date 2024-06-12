import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import '../CSS/CheckList.css';
import ChatBot from './ChatBot';

Chart.register(...registerables);

const CheckList = () => {
    const questions = [
        { question: "의학적 용도 이외에 다른 용도로 약물을 사용한 적이 있습니까?", category: "frequency" },
        { question: "한 번에 한 가지 이상의 약물을 남용합니까?", category: "frequency" },
        { question: "당신은 원하면 언제든지 약물 사용을 중단할 수 있습니까? (만일 한 번도 사용한 적이 없으면 예로 답하시오)", category: "dependency" },
        { question: "약물사용 결과로 의식을 잃거나, 과거의 일이 회상 장면으로 재현된 적이 있습니까?", category: "problem_behavior" },
        { question: "약물사용으로 인해 죄의식을 느낍니까? (약물을 사용한 적이 없으면 ‘아니오’ 로 답하시오)", category: "problem_behavior" },
        { question: "당신의 배우자(부모, 파트너. 가족, 친구 등)가 당신의 약물사용에 대해 호소합니까?", category: "problem_behavior" },
        { question: "약물사용으로 인해 가족들을 등한시 한 적이 있습니까?", category: "problem_behavior" },
        { question: "약물을 구하기 위해 범법 행위를 한 적이 있습니까?", category: "problem_behavior" },
        { question: "약물사용을 중단할 때 금단증상을 경험한 적이 있었습니까?", category: "dependency" },
        { question: "약물사용으로 인해 기억상실, 간염, 발작, 출혈 등과 같은 문제가 있었습니까?", category: "problem_behavior" }
    ];

    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [submitted, setSubmitted] = useState(false);
    const pieChartRef = useRef(null);

    const handleRadioChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    const calculateScores = () => {
        let frequency = 0;
        let dependency = 0;
        let problem_behavior = 0;

        answers.forEach((answer, index) => {
            if (index === 2 && answer === '0') {
                dependency += 1;
            } else if (answer === '1') {
                if (questions[index].category === "frequency") {
                    frequency += 1;
                } else if (questions[index].category === "dependency") {
                    dependency += 1;
                } else if (questions[index].category === "problem_behavior") {
                    problem_behavior += 1;
                }
            }
        });

        return { frequency, dependency, problem_behavior };
    };

    const getResult = () => {
        const { frequency, dependency, problem_behavior } = calculateScores();
        const score = frequency + dependency + problem_behavior;
        if (score >= 0 && score <= 2) {
            return { level: "저위험", color: "color_green", description: "약물 사용에 있어서 저위험군입니다." };
        } else if (score >= 3 && score <= 5) {
            return { level: "중위험", color: "color_orange", description: "약물 사용에 있어서 중간 위험군입니다. 전문가와 상담을 권장합니다." };
        } else {
            return { level: "고위험", color: "color_red", description: "약물 사용에 있어서 고위험군입니다. 즉각적인 전문가의 상담 및 치료가 필요합니다." };
        }
    };

    useEffect(() => {
        if (submitted) {
            const { frequency, dependency, problem_behavior } = calculateScores();
            const pieChartCtx = pieChartRef.current.getContext('2d');

            new Chart(pieChartCtx, {
                type: 'pie',
                data: {
                    labels: ['빈도', '의존성', '문제행동'],
                    datasets: [{
                        label: '점수',
                        data: [frequency, dependency, problem_behavior],
                        backgroundColor: ['#007BFF', '#FFC107', '#DC3545'],
                    }]
                },
                options: {
                    responsive: true
                }
            });
        }
    }, [submitted]);

    const result = getResult();

    return (
        <div className="checklist-container">
            <h2>자가진단 페이지</h2>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    {questions.map((question, index) => (
                        <div key={index} className="con_box2">
                            <div className="question1"><span className="num_01">{index + 1}</span> <div className="con">{question.question}</div></div>
                            <div className="a_box2">
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`q${index + 1}`} 
                                        value="0" 
                                        checked={answers[index] === '0'} 
                                        onChange={() => handleRadioChange(index, '0')} 
                                    />아니오
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name={`q${index + 1}`} 
                                        value="1" 
                                        checked={answers[index] === '1'} 
                                        onChange={() => handleRadioChange(index, '1')} 
                                    />예
                                </label>
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="submit-button">제출하기</button>
                </form>
            ) : (
                <div className="score_box_in2 box_red">
                    <div className="score_box_h">
                        <div className="score_bar_box">
                            <canvas id="myPieChart" ref={pieChartRef} height="180"></canvas>
                        </div>
                    </div>
                    <div className="score_box_left_right">
                        <div className="score_box_h">
                            <div className={`score_box_img al_result2 ${result.color}`}>
                                <div className={`score_total ${result.color}_total`}>{calculateScores().frequency + calculateScores().dependency + calculateScores().problem_behavior}점</div>
                            </div>
                            <div className={`score_total_txt ${result.color}_txt`}>{result.level}</div>
                            <div className="score_result_info2">
                                <p>당신의 약물 사용은 <b style={{ color: result.color }}>{result.description}</b></p>
                            </div>
                            <div className="level_desc1">
                                <div>1 ~ 2</div>
                                <div>3 ~ 5</div>
                                <div>6 이상</div>
                            </div>
                            <div className="level_desc2">
                                <div><p className="score_dot color_green"></p> 저위험</div>
                                <div><p className="score_dot color_orange"></p> 중위험</div>
                                <div><p className="score_dot color_red"></p> 고위험</div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            )}
            <ChatBot />
        </div>
    );
};

export default CheckList;