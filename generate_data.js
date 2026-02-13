const fs = require('fs');
const { faker } = require('@faker-js/faker');

const NUM_CANDIDATES = 40;

function generateData() {
    const candidates = [];
    const evaluations = [];
    const rankings = [];
    const sqlInserts = [];

    for (let i = 1; i <= NUM_CANDIDATES; i++) {
        // 1. Generate Candidate
        const candidate = {
            id: i,
            name: faker.person.fullName(),
            experience_years: faker.number.int({ min: 2, max: 20 }),
            skills: faker.helpers.arrayElements([
                'Lean Manufacturing', 'Six Sigma', 'OSHA Certified', 'Team Leadership',
                'Waste Management', 'Supply Chain', 'Process Optimization', 'Budgeting'
            ], { min: 2, max: 5 })
        };
        candidates.push(candidate);
        sqlInserts.push(`INSERT INTO candidates (id, name, experience_years, skills) VALUES (${candidate.id}, '${candidate.name.replace(/'/g, "''")}', ${candidate.experience_years}, '${JSON.stringify(candidate.skills)}');`);

        // 2. Generate Evaluation
        const evaluation = {
            candidate_id: i,
            crisis_management_score: faker.number.int({ min: 1, max: 10 }),
            sustainability_score: faker.number.int({ min: 1, max: 10 }),
            team_motivation_score: faker.number.int({ min: 1, max: 10 }),
            comments: faker.lorem.sentence()
        };
        evaluations.push(evaluation);
        sqlInserts.push(`INSERT INTO evaluations (candidate_id, crisis_management_score, sustainability_score, team_motivation_score, comments) VALUES (${evaluation.candidate_id}, ${evaluation.crisis_management_score}, ${evaluation.sustainability_score}, ${evaluation.team_motivation_score}, '${evaluation.comments.replace(/'/g, "''")}');`);

        // 3. Generate Ranking (Calculated)
        const total_score = evaluation.crisis_management_score + evaluation.sustainability_score + evaluation.team_motivation_score;
        rankings.push({
            candidate_id: i,
            total_score: total_score,
            // Rank will be calculated after sorting
            details: { ...candidate, ...evaluation } // Merged data for frontend convenience
        });
    }

    // Sort rankings by total_score desc
    rankings.sort((a, b) => b.total_score - a.total_score);

    // Assign rank and generate SQL for rankings
    rankings.forEach((r, index) => {
        r.rank = index + 1;
        sqlInserts.push(`INSERT INTO rankings (candidate_id, total_score, current_rank) VALUES (${r.candidate_id}, ${r.total_score}, ${r.rank});`);
        r.details.rank = r.rank; // Add rank to details for frontend
    });

    // Export JSON for Frontend
    fs.writeFileSync('data.json', JSON.stringify(rankings.map(r => r.details), null, 2));

    // Export SQL for Submission
    fs.writeFileSync('insert_data.sql', sqlInserts.join('\n'));

    console.log(`Generated ${NUM_CANDIDATES} candidates.`);
    console.log('Created data.json and insert_data.sql');
}

generateData();
