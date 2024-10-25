import { watch } from 'rollup';

watch({
  // Exclure certains répertoires
  exclude: ['node_modules/**', 'dist/**']
});