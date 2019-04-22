import './style/style.css'
import './style/bootstrap.css'
import axios from 'axios'

axios.get('/assets/data/data.json')
    .then( res => {
        const table = document.querySelector('table')
        const data = res.data
        const list = Object.keys(data)
        let contributors = []
        list.forEach( username => {
            contributors.push({
                username,
                mergedPRsNumber: data[username].mergedPRsNumber,
                openPRsNumber: data[username].openPRsNumber,
                issuesNumber: data[username].issuesNumber
            })
        })
        console.log(contributors)
        contributors = contributors.sort( (a, b) => {
            if ( a.mergedPRsNumber < b.mergedPRsNumber ){
                return 1;
            }
            if ( a.mergedPRsNumber > b.mergedPRsNumber ){
                return -1;
            }
            if ( a.openPRsNumber < b.openPRsNumber ){
                return 1;
            }
            if ( a.openPRsNumber > b.openPRsNumber ){
                return -1;
            }
            if ( a.openPRsNumber < b.openPRsNumber ){
                return 1;
            }
            if ( a.openPRsNumber > b.openPRsNumber ){
                return -1;
            }
            return 0;
        })
        console.log(contributors)
        contributors.forEach( contributor => {
            const tr = document.createElement('tr')
            
            // avatar
            const tdAvatar = document.createElement('td')
            const avatar = document.createElement('img')
            avatar.src = data[contributor.username].avatarUrl
            avatar.height = '42'
            avatar.width = '42'
            tdAvatar.appendChild(avatar)
            tr.appendChild(tdAvatar)

            // username
            const tdUsername = document.createElement('td')
            const username = document.createElement('a')
            username.href = data[contributor.username].home
            username.innerText = contributor.username
            tdUsername.appendChild(username)
            tr.appendChild(tdUsername)

            // empty td tag
            tr.appendChild(document.createElement('td'))

            // Open PRs
            const tdOpenPRs = document.createElement('td')
            const openPRs = document.createElement('a')
            openPRs.href = data[contributor.username].openPRsLink
            openPRs.innerText = data[contributor.username].openPRsNumber
            tdOpenPRs.appendChild(openPRs)
            tr.appendChild(tdOpenPRs)

            // Merged PRs
            const tdMergedPRs = document.createElement('td')
            const mergedPRs = document.createElement('a')
            mergedPRs.href = data[contributor.username].mergedPRsLink
            mergedPRs.innerText = data[contributor.username].mergedPRsNumber
            tdMergedPRs.appendChild(mergedPRs)
            tr.appendChild(tdMergedPRs)

            // Issues
            const tdIssues = document.createElement('td')
            const issues = document.createElement('a')
            issues.href = data[contributor.username].issuesLink
            issues.innerText = data[contributor.username].issuesNumber
            tdIssues.appendChild(issues)
            tr.appendChild(tdIssues)

            table.appendChild(tr)
        })
    })
