// React / React-Native
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Variables
import { mainBlue, mainDefaultWhite } from "../../../styles/colorConst";
import questionsData from './ask.json'; 

interface Question {
  param: string;
  label: string;
  options: string[];
}

interface QuestionsData {
  questions: Question[];
}

const Approval = () => {

    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [result, setResult] = useState<string>('')

    const handleAnswerSelection = (param: string, option: string) => {
        setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [param]: option,
        }));
    };

    const getResult = () => {
        let approvalPercentage = 0;
      
        if (selectedAnswers['age'] === '18-25 лет') {
          approvalPercentage += 15;
        } else if (selectedAnswers['age'] === '26-35 лет') {
          approvalPercentage += 10;
        } else if (selectedAnswers['age'] === '36-45 лет') {
          approvalPercentage += 5;
        } 
      
        if (selectedAnswers['maritalStatus'] === 'Женат/Замужем') {
          approvalPercentage += 10;
        } 
      
        if (selectedAnswers['employment'] === 'Более 5 лет') {
          approvalPercentage += 20;
        } else if (selectedAnswers['employment'] === '3-5 года') {
          approvalPercentage += 15;
        } 
      
        if (selectedAnswers['monthlyIncome'] === '50,000 - 100,000') {
          approvalPercentage += 25;
        } else if (selectedAnswers['monthlyIncome'] === '30,000 - 50,000') {
          approvalPercentage += 20;
        } 
      
        if (selectedAnswers['hasCreditHistory'] && !selectedAnswers['pastCreditIssues']) {
          approvalPercentage += 15;
        } 

        if (selectedAnswers['loanPurpose'] === 'Покупка недвижимости') {
          approvalPercentage += 30;
        } else if (selectedAnswers['loanPurpose'] === 'Покупка автомобиля') {
          approvalPercentage += 25;
        } 
      
        if (selectedAnswers['collateralAvailable']) {
          approvalPercentage += 10;
        } 
      
        if (approvalPercentage >= 70) {
          setResult(`Кредит одобрен на ${approvalPercentage}%`)
        } else {
          setResult(`Кредит не одобрен. Процент одобрения: ${approvalPercentage}%`)
        }
      };
      
    

    return(
        <View style={styles.conatiner}>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

                <Text style={[styles.uppertext, {marginBottom: 8}]}>Тест на одобряемость кредита</Text>
                <Text style={styles.textDescription}>
                    Пройдите небольшой тест и узнайте на сколько процентов вам будет предодобрен кредит. Для получени точного ответа, обратитесь в отделение банка (Отделения банка можете найти на карте).
                </Text>

                <View style={styles.questionBlock}>
                    {questionsData.questions.map((question, questionIndex) => (
                        <View key={questionIndex} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{question.label}</Text>
                        <View style={styles.optionsContainer}>
                            {question.options.map((option, optionIndex) => (
                            <TouchableOpacity
                                key={optionIndex}
                                style={[
                                styles.optionButton,
                                selectedAnswers[question.param] === option ? styles.selectedOption : null,
                                ]}
                                onPress={() => handleAnswerSelection(question.param, option)}
                            >
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                        </View>
                    ))}

                    {
                        result != '' &&
                        <Text style={[styles.uppertext, {marginBottom: 24}]}>{result}</Text>
                    }

                    <TouchableOpacity onPress={getResult}>
                        <View style={styles.buttonSend}>
                            <Text style={{color: mainDefaultWhite, fontSize: 16, fontWeight: '500'}}>Получить результат</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%', height: 274}}/>

            </ScrollView>

        </View>
    )
}

export default Approval

const styles = StyleSheet.create({
    conatiner: {
        width: '100%',
        height: '100%',
        padding: 8,
    },
    scrollContainer: {

    },
    uppertext: {
        color: '#09101D',
        fontSize: 24,
        fontWeight: '600',
    },
    textDescription: {
        fontSize: 14,
        color: 'gray'
    },
    taskText: {
        color: '#09101D',
        fontSize: 16,
        fontWeight: '400',
    },
    approvalTest: {
        marginTop: 8
    },
    questionBlock: {
        marginTop: 16
    },
    questionContainer: {
        marginBottom: 20,
      },
      questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      optionsContainer: {
        marginLeft: 20,
      },
      optionText: {
        fontSize: 16,
        marginBottom: 5,
      },
      optionButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      selectedOption: {
        borderColor: mainBlue, 
        backgroundColor: '#e0e0e0', 
      },
      buttonSend: {
        width: '100%',
        backgroundColor: mainBlue,
        borderRadius: 6,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
})