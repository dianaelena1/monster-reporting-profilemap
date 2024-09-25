let express = require('express');
let cors = require('cors');
let axios = require('axios');
let app = express();
app.use(cors());
let bodyParser = require('body-parser');

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

app.use(
    cors({
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.post('/testcase', async (request, response) => {
    const payload = request.body;
    const token = request.headers.authorization;

    await postReq(token, payload);

    response.json({});
});

app.get('/testcase/search', async (request, response) => {
    let allTestcases = [];
    try {
        allTestcases = await getReq(request.query.startAt || 0, request.query.maxResults || 800);
        response.json(allTestcases);
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch test cases' });
    }
});

app.listen(3002, () => {
    console.log('Server running on http://localhost:3002');
});

// app.listen(8081, () => {
//     console.log('Server running on http://localhost:8081');
// });

async function getReq() {
    const headers = {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL21zZ2dyb3VwLmF0bGFzc2lhbi5uZXQiLCJ1c2VyIjp7ImFjY291bnRJZCI6IjYyZmY4NmQxZTJiMWI1YWUxNTliZjBjZSJ9fSwiaXNzIjoiY29tLmthbm9haC50ZXN0LW1hbmFnZXIiLCJzdWIiOiJjY2NkYTQyYy03YjQ1LTNjY2YtOWNhMi1mZjY1Y2E0YzNhOGEiLCJleHAiOjE3NTgxMTUzNjgsImlhdCI6MTcyNjU3OTM2OH0.M1G8oLocoDvwDfDmol5sbS7UWEEXZJrRTSNHNVq9gS4',
    };

    const requestOptions = {
        method: 'GET',
        url: `https://api.zephyrscale.smartbear.com/v2/testcases`,
        headers: headers,
    };

    try {
        const response = await axios(requestOptions);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        console.log(`  -  ZEPHYR: Success: Response: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
        console.error(`  -  ZEPHYR: Error: Response: ${error}`);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
}

function getTC() {
    let allTestCases = [];
    const maxResults = 200;

    const headers = {
        'Content-Type': 'application/json',
        Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL21zZ2dyb3VwLmF0bGFzc2lhbi5uZXQiLCJ1c2VyIjp7ImFjY291bnRJZCI6IjYyZmY4NmQxZTJiMWI1YWUxNTliZjBjZSJ9fSwiaXNzIjoiY29tLmthbm9haC50ZXN0LW1hbmFnZXIiLCJzdWIiOiJjY2NkYTQyYy03YjQ1LTNjY2YtOWNhMi1mZjY1Y2E0YzNhOGEiLCJleHAiOjE3NTgxMTUzNjgsImlhdCI6MTcyNjU3OTM2OH0.M1G8oLocoDvwDfDmol5sbS7UWEEXZJrRTSNHNVq9gS4',
    };

    while (true) {
        const requestOptions = {
            method: 'GET',
            url: encodeURI(`http://localhost:3002/testcase/search`),
            headers: headers,
        };

        const response = axios(requestOptions);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const testCasesChunk = response.data;

        if (!testCasesChunk || testCasesChunk.length === 0) {
            break;
        }

        allTestCases = allTestCases.concat(testCasesChunk);

        if (testCasesChunk.length < maxResults) {
            break;
        }
    }

    console.log('Total test cases fetched:', allTestCases.length);
    return allTestCases;
}

async function createTestCycle(name, folder, testCases) {
    const payload = {
        name: name,
        folder: folder,
        projectKey: 'PROMAWS',
        items: testCases,
        description: 'Description of the test cycle',
    };

    const url = 'http://localhost:3002/testcycles';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7ImJhc2VVcmwiOiJodHRwczovL21zZ2dyb3VwLmF0bGFzc2lhbi5uZXQiLCJ1c2VyIjp7ImFjY291bnRJZCI6IjYyZmY4NmQxZTJiMWI1YWUxNTliZjBjZSJ9fSwiaXNzIjoiY29tLmthbm9haC50ZXN0LW1hbmFnZXIiLCJzdWIiOiJjY2NkYTQyYy03YjQ1LTNjY2YtOWNhMi1mZjY1Y2E0YzNhOGEiLCJleHAiOjE3NTgxMTUzNjgsImlhdCI6MTcyNjU3OTM2OH0.M1G8oLocoDvwDfDmol5sbS7UWEEXZJrRTSNHNVq9gS4',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Test Cycle Created:', responseData);
    } catch (error) {
        console.error('Error creating test cycle:', error);
    }
}

async function Create_ZpTestCycle_For_ZpLabels(name, folder, labels) {
    const testCases = await getTC(labels);

    if (!testCases || !testCases.length) {
        console.log(`  -  ZEPHYR: No test cases found`);
        return;
    }

    await createTestCycle(
        name,
        folder,
        testCases.map((testCase) => {
            return { testCaseKey: testCase.key };
        })
    );
}

async function postReq(token, payload) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: token,
    };

    const requestOptions = {
        method: 'POST',
        url: 'https://doris.msg.de/rest/atm/1.0/testrun',
        headers: headers,
        data: payload,
    };

    try {
        const response = await axios(requestOptions);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const json = response.data;
        console.log(`  -  ZEPHYR: Success: Response: ${JSON.stringify(json)}`);
        return json;
    } catch (error) {
        console.error(`  -  ZEPHYR: Error: Response: ${error}`);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
}

// (async () => {
//     const name = 'TEST';
//     const folder = '/Smoke Tests';
//     const labels = ['Zephyr'];

//     await Create_ZpTestCycle_For_ZpLabels(name, folder, labels);
// })();
