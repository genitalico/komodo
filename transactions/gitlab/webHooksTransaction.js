exports.PushEvent = (model) => {

    let object_kind = ['#GitLab ', model.object_kind, '\n'].join('');
    let author = ['*Author:* ', model.user_name, '\n'].join('');
    let project = ['*Project:* ', model.project.name, '\n'].join('');
    let totalCommits = ['*Total Commits:* ', model.total_commits_count, '\n'].join('');
    let commitsMsg = [];
    for (let i = 0; i < model.commits.length; i++) {
        commitsMsg.push((i + 1) + ": " + model.commits[i].message + '\n');
    }
    let commitsMsgText = commitsMsg.join('');
    let commitsMsgText2 = ['*Commits:* \n', commitsMsgText].join('');
    let branch = ['*Branch:* ', model.ref.replace('refs/heads/', ''), '\n'].join('');
    let urlProject = ['\n', '[Url Project]', '(', model.repository.homepage, ')', '\n\n'].join('');
    let compare = ['[Compare Changes]', '(', model.repository.homepage, , '/compare/', model.before, '...', model.after, ')\n\n'].join('');
    let text = [author, project, branch, totalCommits, urlProject, compare, commitsMsgText2].join('');

    return text;
}

exports.PipelineEvent = (model) => {

    let status = ['*Status:* ', model.object_attributes.status, '\n'].join('');
    let stages = model.object_attributes.stages.join(',');
    let stagesText = ['*Stages:* ', stages, '\n'].join('');
    let duration = ['*Duration:* ', model.object_attributes.duration, '\n'].join('');
    let project = ['*Project:* ', model.project.name, '\n'].join('');
    let builds = [];

    for (let i = 0; i < model.builds.length; i++) {
        let names = [i + 1, ': ', model.builds[i].name, '\n'].join('');
        builds.push(names);
    }

    let buildText = ['*Builds:* ', '\n', builds.join(''), '\n'].join('');

    let text = [project, status, stagesText, duration, buildText].join('');

    return text;
}
