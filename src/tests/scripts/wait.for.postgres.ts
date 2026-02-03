import { exec } from 'node:child_process';

function checkPostgres() {
  exec(
    'docker exec nest-template pg_isready --host localhost',
    (err, stdout) => {
      if (stdout.search('accepting connections') === -1) {
        process.stdout.write('.');
        return checkPostgres();
      }

      process.stdout.write('\n🟢 Postgres está aceitando conexões.\n\n\n');
    },
  );
}

process.stdout.write('\n\n🔴 Aguardando conexão com Postgres.');

checkPostgres();
